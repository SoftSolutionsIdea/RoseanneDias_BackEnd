import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsOptional } from 'class-validator'
import { createCategoryDto } from './createCategory.dto'
import { createColorDto } from './createColor.dto'
import { createImageDto } from './createImage.dto'
import { createRentalDto } from './createRental.dto'
import { createSpentValueDto } from './createSpentValue.dto'
import { createStatusDto } from './createStatus.dto'

export class updateProductsDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" não pode ser vazio' })
  @IsOptional() 
  name?: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "código" não pode ser vazio' })
  @IsOptional() 
  code?: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "tamanho" não pode ser vazio' })
  @IsOptional() 
  size?: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "descrição" não pode ser vazio' })
  @IsOptional() 
  description?: string

  @IsNumber()
  @IsNotEmpty({ message: 'O campo "quantidade" não pode ser vazio' })
  @IsOptional() 
  amount?: number

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "categoria" não pode ser vazio' })
  @Type(() => createCategoryDto)
  @IsOptional() 
  category?: createCategoryDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "cor" não pode ser vazio' })
  @Type(() => createColorDto)
  @IsOptional() 
  color?: createColorDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "imagem" não pode ser vazio' })
  @Type(() => createImageDto)
  @IsOptional() 
  image?: createImageDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "aluguel" não pode ser vazio' })
  @Type(() => createRentalDto)
  @IsOptional() 
  rental?: createRentalDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "valor gasto" não pode ser vazio' })
  @Type(() => createSpentValueDto)
  @IsOptional() 
  spentValue?: createSpentValueDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "status" não pode ser vazio' })
  @Type(() => createStatusDto)
  @IsOptional() 
  status?: createStatusDto
}