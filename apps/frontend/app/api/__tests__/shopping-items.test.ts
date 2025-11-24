import {
  fetchShoppingItems,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem,
  togglePurchasedItem,
} from '../shopping-items';
import { ItemFormData } from '../../types/item-form-data';

global.fetch = jest.fn();

describe('Shopping Items API', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('fetchShoppingItems', () => {
    it('should fetch shopping items successfully', async () => {
      const mockItems = [
        { id: '1', itemName: 'Test', description: 'Test desc', quantity: '1', purchased: false, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockItems,
      });

      const result = await fetchShoppingItems();
      expect(result).toEqual(mockItems);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/items');
    });

    it('should throw error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchShoppingItems()).rejects.toThrow('Failed to fetch shopping items');
    });
  });

  describe('createShoppingItem', () => {
    it('should create item successfully', async () => {
      const newItem: ItemFormData = {
        itemName: 'New Item',
        description: 'Description',
        quantity: '5',
        purchased: false,
      };

      const mockResponse = {
        id: '1',
        ...newItem,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createShoppingItem(newItem);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
    });

    it('should throw error when creation fails', async () => {
      const newItem: ItemFormData = {
        itemName: 'New Item',
        description: 'Description',
        quantity: '5',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(createShoppingItem(newItem)).rejects.toThrow('Failed to create shopping item');
    });
  });

  describe('updateShoppingItem', () => {
    it('should update item successfully', async () => {
      const updateData: ItemFormData = {
        itemName: 'Updated Item',
        description: 'Updated Description',
        quantity: '10',
      };

      const mockResponse = {
        id: '1',
        ...updateData,
        purchased: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await updateShoppingItem('1', updateData);
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/items/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
    });

    it('should throw error when update fails', async () => {
      const updateData: ItemFormData = {
        itemName: 'Updated Item',
        description: 'Updated Description',
        quantity: '10',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(updateShoppingItem('1', updateData)).rejects.toThrow('Failed to update shopping item');
    });
  });

  describe('deleteShoppingItem', () => {
    it('should delete item successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await deleteShoppingItem('1');
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/items/1', {
        method: 'DELETE',
      });
    });

    it('should throw error when deletion fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(deleteShoppingItem('1')).rejects.toThrow('Failed to delete shopping item');
    });
  });

  describe('togglePurchasedItem', () => {
    it('should toggle purchased status successfully', async () => {
      const mockResponse = {
        id: '1',
        itemName: 'Test',
        description: 'Test desc',
        quantity: '1',
        purchased: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await togglePurchasedItem('1');
      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/items/1/toggle-purchased', {
        method: 'PATCH',
      });
    });

    it('should throw error when toggle fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(togglePurchasedItem('1')).rejects.toThrow('Failed to toggle purchased status');
    });
  });
});

