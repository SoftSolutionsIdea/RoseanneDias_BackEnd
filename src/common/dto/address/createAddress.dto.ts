import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateBairroDto } from './createBairro.dto'
import { CreateStateDto } from './createState.dto'
import { CreateCityDto } from './createCity.dto'
import { CreateCepDto } from './createCep.dto'
import { CreateStreetDto } from './createStreet.dto'

export class CreateAddressDto {
  @IsOptional()
  id?: number

  @IsString()
  @IsNotEmpty({ message: 'O campo "Número" não pode ser vazio'})
  num: string

  @IsString()
  @IsOptional()
  complement?: string

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "CEP" não pode ser vazio'})
  @Type(() => CreateCepDto)
  cep: CreateCepDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Cidade" não pode ser vazio'})
  @Type(() => CreateStreetDto)
  street: CreateStreetDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Bairro" não pode ser vazio'})
  @Type(() => CreateBairroDto)
  bairro: CreateBairroDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Estado" não pode ser vazio'})
  @Type(() => CreateStateDto)
  state: CreateStateDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Cidade" não pode ser vazio'})
  @Type(() => CreateCityDto)
  city: CreateCityDto
}
