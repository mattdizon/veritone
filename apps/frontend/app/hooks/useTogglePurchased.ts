import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePurchasedItem } from '../api/shopping-items';
import { useShoppingListStore } from '../stores/useShoppingListStore';

export function useTogglePurchased() {
  const queryClient = useQueryClient();
  const { togglePurchased: togglePurchasedInStore } = useShoppingListStore();

  return useMutation({
    mutationFn: togglePurchasedItem,
    onMutate: async (id) => {
      togglePurchasedInStore(id);
      
      await queryClient.cancelQueries({ queryKey: ['shoppingItems'] });
    },
    onSuccess: (updatedItem) => {
      const { updateItem } = useShoppingListStore.getState();
      updateItem(updatedItem.id, updatedItem);
      
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
  });
}

