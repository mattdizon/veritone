import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateItem } from '../useCreateItem';
import { createShoppingItem } from '../../api/shopping-items';

jest.mock('../../api/shopping-items');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useCreateItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create item and invalidate queries', async () => {
    const newItem = {
      itemName: 'New Item',
      description: 'Description',
      quantity: '5',
      purchased: false,
    };

    const createdItem = {
      id: '1',
      ...newItem,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };

    (createShoppingItem as jest.Mock).mockResolvedValue(createdItem);

    const { result } = renderHook(() => useCreateItem(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newItem);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(createShoppingItem).toHaveBeenCalledWith(newItem, expect.any(Object));
    expect(result.current.data).toEqual(createdItem);
  });

  it('should handle error on creation failure', async () => {
    const newItem = {
      itemName: 'New Item',
      description: 'Description',
      quantity: '5',
    };

    const error = new Error('Failed to create');
    (createShoppingItem as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateItem(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newItem);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });
});

