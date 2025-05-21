import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";


export class CreateItemDto{
    @IsString()
    @IsNotEmpty()

    name!:string;

    @IsInt()
    @Min(1)
    quantity!:number;

    @IsPositive()
    price!:Float32Array;

    @IsInt()
    categoryId!:number;
}