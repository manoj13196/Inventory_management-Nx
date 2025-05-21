import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './category/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/category.entity';
import { Item } from './items/item.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CategoriesModule,
    ItemsModule,
    
    TypeOrmModule.forRoot(
      {
        type:'postgres',
        host:'localhost',
        port:5432,
        username:'InventoryManager',
        password:'12345678',
        database:'Inventory',

        autoLoadEntities:true,

        synchronize:true,

      }
    ),
  TypeOrmModule.forFeature([Category, Item]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
