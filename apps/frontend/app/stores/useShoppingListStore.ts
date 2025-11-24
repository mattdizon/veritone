import { create } from 'zustand';
import { ShoppingItem } from '../types/shopping-item';

interface ShoppingListState {
  items: ShoppingItem[];
  isLoading: boolean;
  error: Error | null;
  setItems: (items: ShoppingItem[]) => void;
  addItem: (item: ShoppingItem) => void;
  updateItem: (id: string, item: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  togglePurchased: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useShoppingListStore = create<ShoppingListState>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  togglePurchased: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

