import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingItem } from './entities/shopping-item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShoppingItem)
    private shoppingItemRepository: Repository<ShoppingItem>,
  ) {}

  getHello(): string {
    return 'Hello from NestJS Backend!';
  }

  async getAllItems(): Promise<ShoppingItem[]> {
    return this.shoppingItemRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getItemById(id: string): Promise<ShoppingItem> {
    return this.shoppingItemRepository.findOne({ where: { id } });
  }

  async createItem(createItemDto: CreateItemDto): Promise<ShoppingItem> {
    const item = this.shoppingItemRepository.create({
      ...createItemDto,
      purchased: createItemDto.purchased || false,
    });
    return this.shoppingItemRepository.save(item);
  }

  async updateItem(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ShoppingItem> {
    await this.shoppingItemRepository.update(id, updateItemDto);
    return this.getItemById(id);
  }

  async deleteItem(id: string): Promise<void> {
    await this.shoppingItemRepository.delete(id);
  }

  async togglePurchased(id: string): Promise<ShoppingItem> {
    const item = await this.getItemById(id);
    if (!item) {
      throw new Error('Item not found');
    }
    item.purchased = !item.purchased;
    return this.shoppingItemRepository.save(item);
  }
}
