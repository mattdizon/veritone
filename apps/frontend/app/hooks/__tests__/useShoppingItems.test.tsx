import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useShoppingItems } from '../useShoppingItems';
import { fetchShoppingItems } from '../../api/shopping-items';
import { useShoppingListStore } from '../../stores/useShoppingListStore';

jest.mock('../../api/shopping-items');

beforeEach(() => {
  useShoppingListStore.getState().setItems([]);
  useShoppingListStore.getState().setLoading(false);
  useShoppingListStore.getState().setError(null);
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useShoppingItems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch shopping items', async () => {
    const mockItems = [
      {
        id: '1',
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: '5',
        purchased: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];

    (fetchShoppingItems as jest.Mock).mockResolvedValue(mockItems);

    const { result } = renderHook(() => useShoppingItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockItems);
    expect(fetchShoppingItems).toHaveBeenCalledTimes(1);
  });

  it('should handle loading state', () => {
    (fetchShoppingItems as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useShoppingItems(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const errorMessage = 'Failed to fetch';
    (fetchShoppingItems as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useShoppingItems(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBeUndefined();
  });
});

