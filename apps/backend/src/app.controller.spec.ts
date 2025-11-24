import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ShoppingItem } from './entities/shopping-item.entity';

describe('AppController', () => {
  let controller: AppController;

  const mockAppService = {
    getHello: jest.fn(),
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
    togglePurchased: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const result = controller.getHealth();

      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('message', 'Backend is running');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('getItems', () => {
    it('should return all items', async () => {
      const mockItems: ShoppingItem[] = [
        {
          id: '1',
          itemName: 'Item 1',
          description: 'Description 1',
          quantity: '5',
          purchased: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockAppService.getAllItems.mockResolvedValue(mockItems);

      const result = await controller.getItems();

      expect(result).toEqual(mockItems);
      expect(mockAppService.getAllItems).toHaveBeenCalledTimes(1);
    });
  });

  describe('getItemById', () => {
    it('should return item by id', async () => {
      const mockItem: ShoppingItem = {
        id: '1',
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: '5',
        purchased: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAppService.getItemById.mockResolvedValue(mockItem);

      const result = await controller.getItemById('1');

      expect(result).toEqual(mockItem);
      expect(mockAppService.getItemById).toHaveBeenCalledWith('1');
    });
  });

  describe('createItem', () => {
    it('should create a new item', async () => {
      const createDto: CreateItemDto = {
        itemName: 'New Item',
        description: 'New Description',
        quantity: '10',
        purchased: false,
      };

      const createdItem: ShoppingItem = {
        id: '1',
        itemName: createDto.itemName,
        description: createDto.description,
        quantity: createDto.quantity,
        purchased: createDto.purchased ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAppService.createItem.mockResolvedValue(createdItem);

      const result = await controller.createItem(createDto);

      expect(result).toEqual(createdItem);
      expect(mockAppService.createItem).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateItem', () => {
    it('should update an item', async () => {
      const updateDto: UpdateItemDto = {
        itemName: 'Updated Item',
        quantity: '20',
      };

      const updatedItem: ShoppingItem = {
        id: '1',
        itemName: 'Updated Item',
        description: 'Original Description',
        quantity: '20',
        purchased: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAppService.updateItem.mockResolvedValue(updatedItem);

      const result = await controller.updateItem('1', updateDto);

      expect(result).toEqual(updatedItem);
      expect(mockAppService.updateItem).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      mockAppService.deleteItem.mockResolvedValue(undefined);

      await controller.deleteItem('1');

      expect(mockAppService.deleteItem).toHaveBeenCalledWith('1');
    });
  });

  describe('togglePurchased', () => {
    it('should toggle purchased status', async () => {
      const toggledItem: ShoppingItem = {
        id: '1',
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: '5',
        purchased: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockAppService.togglePurchased.mockResolvedValue(toggledItem);

      const result = await controller.togglePurchased('1');

      expect(result).toEqual(toggledItem);
      expect(mockAppService.togglePurchased).toHaveBeenCalledWith('1');
    });
  });
});
