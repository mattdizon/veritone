import { renderHook, act } from '@testing-library/react';
import { useModalStore } from '../useModalStore';
import { ShoppingItem } from '../../types/shopping-item';

const mockItem: ShoppingItem = {
  id: '1',
  itemName: 'Test Item',
  description: 'Test Description',
  quantity: '5',
  purchased: false,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

describe('useModalStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useModalStore());
    act(() => {
      result.current.closeItemModal();
      result.current.closeDeleteModal();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useModalStore());

    expect(result.current.isItemModalOpen).toBe(false);
    expect(result.current.isDeleteModalOpen).toBe(false);
    expect(result.current.editingItem).toBe(null);
    expect(result.current.itemToDelete).toBe(null);
  });

  describe('Item Modal', () => {
    it('should open item modal', () => {
      const { result } = renderHook(() => useModalStore());

      act(() => {
        result.current.openItemModal();
      });

      expect(result.current.isItemModalOpen).toBe(true);
      expect(result.current.editingItem).toBe(null);
    });

    it('should open item modal with editing item', () => {
      const { result } = renderHook(() => useModalStore());

      act(() => {
        result.current.openItemModal(mockItem);
      });

      expect(result.current.isItemModalOpen).toBe(true);
      expect(result.current.editingItem).toEqual(mockItem);
    });

    it('should close item modal', () => {
      const { result } = renderHook(() => useModalStore());

      act(() => {
        result.current.openItemModal(mockItem);
      });

      expect(result.current.isItemModalOpen).toBe(true);

      act(() => {
        result.current.closeItemModal();
      });

      expect(result.current.isItemModalOpen).toBe(false);
      expect(result.current.editingItem).toBe(null);
    });
  });

  describe('Delete Modal', () => {
    it('should open delete modal with item id', () => {
      const { result } = renderHook(() => useModalStore());

      act(() => {
        result.current.openDeleteModal('1');
      });

      expect(result.current.isDeleteModalOpen).toBe(true);
      expect(result.current.itemToDelete).toBe('1');
    });

    it('should close delete modal', () => {
      const { result } = renderHook(() => useModalStore());

      act(() => {
        result.current.openDeleteModal('1');
      });

      expect(result.current.isDeleteModalOpen).toBe(true);

      act(() => {
        result.current.closeDeleteModal();
      });

      expect(result.current.isDeleteModalOpen).toBe(false);
      expect(result.current.itemToDelete).toBe(null);
    });
  });
});

