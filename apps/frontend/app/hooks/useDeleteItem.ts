import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShoppingItem } from '../api/shopping-items';
import { useShoppingListStore } from '../stores/useShoppingListStore';

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const { deleteItem: deleteItemFromStore } = useShoppingListStore();

  return useMutation({
    mutationFn: deleteShoppingItem,
    onMutate: async (id) => {
      deleteItemFromStore(id);
      await queryClient.cancelQueries({ queryKey: ['shoppingItems'] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
  });
}

