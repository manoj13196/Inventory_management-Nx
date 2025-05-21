import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './Dto/create_item.dto';
import { UpdateItemDto } from './Dto/update_item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findByCategory(categoryId: number): Promise<Item[]> {
    return this.itemRepository.find({ where: { categoryId } });
  }

  findOne(id: number): Promise<Item> {
    return this.itemRepository.findOneBy({ id })as Promise<Item>;
  }

  async create(createItemDto:CreateItemDto): Promise<Item> {
    const post=await this.itemRepository.create(createItemDto)
    return this.itemRepository.save(post);
  
  }

  async update(id: number, updateItemDto:UpdateItemDto): Promise<Item> {
    
    await this.itemRepository.update(id, updateItemDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
