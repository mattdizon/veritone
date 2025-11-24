import { create } from 'zustand';
import { ShoppingItem } from '../types/shopping-item';

interface ModalState {
  isItemModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editingItem: ShoppingItem | null;
  itemToDelete: string | null;
  openItemModal: (item?: ShoppingItem) => void;
  closeItemModal: () => void;
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isItemModalOpen: false,
  isDeleteModalOpen: false,
  editingItem: null,
  itemToDelete: null,
  openItemModal: (item) => set({ isItemModalOpen: true, editingItem: item || null }),
  closeItemModal: () => set({ isItemModalOpen: false, editingItem: null }),
  openDeleteModal: (id) => set({ isDeleteModalOpen: true, itemToDelete: id }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, itemToDelete: null }),
}));

