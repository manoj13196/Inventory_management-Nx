import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesServices } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // <-- important
  providers: [CategoriesServices],
  controllers: [CategoriesController],
  exports: [CategoriesServices], // if used outside this module
})
export class CategoriesModule {}
