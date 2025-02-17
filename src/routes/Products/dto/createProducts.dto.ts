import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { createCategoryDto } from './createCategory.dto'
import { createColorDto } from './createColor.dto'
import { createImageDto } from './createImage.dto'
import { createRentalDto } from './createRental.dto'
import { createSpentValueDto } from './createSpentValue.dto'
import { createStatusDto } from './createStatus.dto'

export class CreateProductsDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" não pode ser vazio' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "código" não pode ser vazio' })
  code: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "tamanho" não pode ser vazio' })
  size: string

  @IsString()
  @IsNotEmpty({ message: 'O campo "descrição" não pode ser vazio' })
  description: string

  @IsNumber()
  @IsNotEmpty({ message: 'O campo "quantidade" não pode ser vazio' })
  amount: number

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "categoria" não pode ser vazio' })
  @Type(() => createCategoryDto)
  category: createCategoryDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "cor" não pode ser vazio' })
  @Type(() => createColorDto)
  color: createColorDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "imagem" não pode ser vazio' })
  @Type(() => createImageDto)
  image: createImageDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "aluguel" não pode ser vazio' })
  @Type(() => createRentalDto)
  rental: createRentalDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "valor gasto" não pode ser vazio' })
  @Type(() => createSpentValueDto)
  spentValue: createSpentValueDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "status" não pode ser vazio' })
  @Type(() => createStatusDto)
  status: createStatusDto
}