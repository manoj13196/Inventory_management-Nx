import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesServices {
 
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository:Repository<Category>
  ){}

  findAll():Promise<Category[]>{
    return this.categoryRepository.find();
  }
}
