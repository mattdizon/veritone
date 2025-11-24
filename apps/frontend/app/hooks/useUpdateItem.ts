import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShoppingItem } from '../api/shopping-items';
import { ItemFormData } from '../types/item-form-data';
import { useShoppingListStore } from '../stores/useShoppingListStore';

export function useUpdateItem() {
  const queryClient = useQueryClient();
  const { updateItem: updateItemInStore, items } = useShoppingListStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ItemFormData }) =>
      updateShoppingItem(id, data),
    onMutate: async ({ id, data }) => {
      const currentItem = items.find((item) => item.id === id);
      if (currentItem) {
        updateItemInStore(id, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }
      await queryClient.cancelQueries({ queryKey: ['shoppingItems'] });
    },
    onSuccess: (updatedItem) => {
      updateItemInStore(updatedItem.id, updatedItem);
      
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
  });
}

