import { PartialType } from "@nestjs/mapped-types";
import { CreateItemDto } from "./create_item.dto";

export class UpdateItemDto extends PartialType(CreateItemDto){}