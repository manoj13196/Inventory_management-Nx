import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { CreateItemDto } from './Dto/create_item.dto';
import { UpdateItemDto } from './Dto/update_item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems(@Query('categoryId') categoryId?: string): Promise<Item[]> {
    if (categoryId) {
      return this.itemsService.findByCategory(Number(categoryId));
    }
    return this.itemsService.findAll();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  createItem(@Body() createItemDto:CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto:UpdateItemDto,
  ): Promise<Item> {
  
    return this.itemsService.update(Number(id), updateItemDto);
  }

  @Delete(':id')
  removeItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.remove(id);
  }
}
