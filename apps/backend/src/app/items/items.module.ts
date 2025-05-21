import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item])], // Import repository for Item entity
  providers: [ItemsService],                   // Register ItemsService
  controllers: [ItemsController],              // Register ItemsController
})
export class ItemsModule {}
