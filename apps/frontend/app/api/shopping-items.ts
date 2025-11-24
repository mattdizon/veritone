import { ShoppingItem } from '../types/shopping-item';
import { ItemFormData } from '../types/item-form-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchShoppingItems(): Promise<ShoppingItem[]> {
  const response = await fetch(`${API_URL}/api/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch shopping items');
  }
  return response.json();
}

export async function createShoppingItem(data: ItemFormData): Promise<ShoppingItem> {
  const response = await fetch(`${API_URL}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create shopping item');
  }
  return response.json();
}

export async function updateShoppingItem(id: string, data: ItemFormData): Promise<ShoppingItem> {
  const response = await fetch(`${API_URL}/api/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update shopping item');
  }
  return response.json();
}

export async function deleteShoppingItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete shopping item');
  }
}

export async function togglePurchasedItem(id: string): Promise<ShoppingItem> {
  const response = await fetch(`${API_URL}/api/items/${id}/toggle-purchased`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle purchased status');
  }
  return response.json();
}

