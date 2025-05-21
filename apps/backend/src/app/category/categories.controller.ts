import { Controller, Get } from "@nestjs/common";
import { CategoriesServices } from "./categories.service";
import { Category } from "./category.entity";


@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService:CategoriesServices){}
    @Get()
    findAll():Promise<Category[]>{
        return this.categoriesService.findAll()
    }

}