import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      message: 'Backend is running',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('items')
  getItems() {
    return this.appService.getAllItems();
  }

  @Get('items/:id')
  getItemById(@Param('id') id: string) {
    return this.appService.getItemById(id);
  }

  @Post('items')
  createItem(@Body() createItemDto: CreateItemDto) {
    return this.appService.createItem(createItemDto);
  }

  @Put('items/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.appService.updateItem(id, updateItemDto);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.appService.deleteItem(id);
  }

  @Patch('items/:id/toggle-purchased')
  togglePurchased(@Param('id') id: string) {
    return this.appService.togglePurchased(id);
  }
}
