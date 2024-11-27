import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { createCategoryDto } from "./createCategory.dto";
import { createColorDto } from "./createColor.dto";
import { createImageDto } from "./createImage.dto";
import { createRentalDto } from "./createRental.dto";
import { createSpentValueDto } from "./createSpentValue.dto";
import { createStatusDto } from "./createStatus.dto";

export class CreateProductsDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    size: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createCategoryDto)
    category: createCategoryDto; 

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createColorDto)
    color: createColorDto;  

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createImageDto)
    image: createImageDto;  

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createRentalDto)
    rental: createRentalDto;  

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createSpentValueDto)
    spentValue: createSpentValueDto;  

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => createStatusDto)
    status: createStatusDto;  
}
