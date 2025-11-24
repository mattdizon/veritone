import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchShoppingItems } from '../api/shopping-items';
import { useShoppingListStore } from '../stores/useShoppingListStore';

export function useShoppingItems() {
  const { setItems, setLoading, setError, items, error } = useShoppingListStore();
  
  const query = useQuery({
    queryKey: ['shoppingItems'],
    queryFn: fetchShoppingItems,
  });

  useEffect(() => {
    if (query.data) {
      setItems(query.data);
    }
    setLoading(query.isLoading || query.isFetching);
    setError(query.error as Error | null);
  }, [query.data, query.isLoading, query.isFetching, query.error, setItems, setLoading, setError]);

  const isActuallyLoading = query.isLoading || query.isFetching;

  return {
    data: query.isSuccess ? items : query.data,
    isLoading: isActuallyLoading,
    error,
    isSuccess: query.isSuccess,
    isError: query.isError,
    refetch: query.refetch,
  };
}

