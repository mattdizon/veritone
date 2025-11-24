import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ShoppingItem } from './entities/shopping-item.entity';
import { CreateItemDto } from './dto/create-item.dto';

describe('AppService', () => {
  let service: AppService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(ShoppingItem),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHello', () => {
    it('should return hello message', () => {
      expect(service.getHello()).toBe('Hello from NestJS Backend!');
    });
  });

  describe('getAllItems', () => {
    it('should return all items ordered by createdAt DESC', async () => {
      const mockItems: ShoppingItem[] = [
        {
          id: '1',
          itemName: 'Item 1',
          description: 'Description 1',
          quantity: '5',
          purchased: false,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '2',
          itemName: 'Item 2',
          description: 'Description 2',
          quantity: '3',
          purchased: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      mockRepository.find.mockResolvedValue(mockItems);

      const result = await service.getAllItems();

      expect(result).toEqual(mockItems);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
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

      mockRepository.findOne.mockResolvedValue(mockItem);

      const result = await service.getItemById('1');

      expect(result).toEqual(mockItem);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('createItem', () => {
    it('should create and save a new item', async () => {
      const createDto: CreateItemDto = {
        itemName: 'New Item',
        description: 'New Description',
        quantity: '10',
        purchased: false,
      };

      const savedItem: ShoppingItem = {
        id: '1',
        itemName: createDto.itemName,
        description: createDto.description,
        quantity: createDto.quantity,
        purchased: createDto.purchased ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(savedItem);
      mockRepository.save.mockResolvedValue(savedItem);

      const result = await service.createItem(createDto);

      expect(result).toEqual(savedItem);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createDto,
        purchased: false,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(savedItem);
    });

    it('should default purchased to false if not provided', async () => {
      const createDto: CreateItemDto = {
        itemName: 'New Item',
        description: 'New Description',
        quantity: '10',
      };

      const savedItem: ShoppingItem = {
        id: '1',
        ...createDto,
        purchased: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockReturnValue(savedItem);
      mockRepository.save.mockResolvedValue(savedItem);

      await service.createItem(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createDto,
        purchased: false,
      });
    });
  });

  describe('updateItem', () => {
    it('should update item and return updated item', async () => {
      const updateData = {
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

      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedItem);

      const result = await service.updateItem('1', updateData);

      expect(result).toEqual(updatedItem);
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('deleteItem', () => {
    it('should delete item by id', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteItem('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('togglePurchased', () => {
    it('should toggle purchased status from false to true', async () => {
      const item: ShoppingItem = {
        id: '1',
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: '5',
        purchased: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const toggledItem = { ...item, purchased: true };

      mockRepository.findOne.mockResolvedValue(item);
      mockRepository.save.mockResolvedValue(toggledItem);

      const result = await service.togglePurchased('1');

      expect(result.purchased).toBe(true);
      expect(mockRepository.save).toHaveBeenCalledWith(toggledItem);
    });

    it('should toggle purchased status from true to false', async () => {
      const item: ShoppingItem = {
        id: '1',
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: '5',
        purchased: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const toggledItem = { ...item, purchased: false };

      mockRepository.findOne.mockResolvedValue(item);
      mockRepository.save.mockResolvedValue(toggledItem);

      const result = await service.togglePurchased('1');

      expect(result.purchased).toBe(false);
    });

    it('should throw error if item not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.togglePurchased('999')).rejects.toThrow(
        'Item not found',
      );
    });
  });
});
