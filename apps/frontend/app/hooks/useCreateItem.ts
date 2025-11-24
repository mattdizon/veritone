import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShoppingItem } from '../api/shopping-items';
import { useShoppingListStore } from '../stores/useShoppingListStore';
import { ShoppingItem } from '../types/shopping-item';

export function useCreateItem() {
  const queryClient = useQueryClient();
  const { addItem, setItems } = useShoppingListStore();

  return useMutation({
    mutationFn: createShoppingItem,
    onMutate: async (newItem) => {
      const optimisticItem: ShoppingItem = {
        id: `temp-${Date.now()}`,
        ...newItem,
        purchased: newItem.purchased || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addItem(optimisticItem);
      
      await queryClient.cancelQueries({ queryKey: ['shoppingItems'] });
    },
    onSuccess: (createdItem) => {
      const currentItems = useShoppingListStore.getState().items;
      const updatedItems = currentItems.map((item) =>
        item.id.startsWith('temp-') ? createdItem : item
      );
      setItems(updatedItems);
      
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: () => {
      const currentItems = useShoppingListStore.getState().items;
      setItems(currentItems.filter((item) => !item.id.startsWith('temp-')));
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
  });
}

