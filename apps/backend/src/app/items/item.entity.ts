import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Category} from '../category/category.entity';


@Entity()
export class Item{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    name!:string;

    @Column()
    quantity!:number;

  @Column('decimal')
  price!: string;
      @Column()
  categoryId!: number;

    @ManyToOne(()=>Category, (category)=>category.items)
    category!:Category;
    

}