// src/employee/dtos/updateEmployee.dto.ts
import {
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateRoleDto } from './createRole.dto'
import { CreateAddressDto } from '../../common/dto/address/createAddress.dto'
import { CreateTimeDto } from './createTime.dto'
import { CreateWageDto } from './createWage.dto'

export class updateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  cpf?: string

  @IsString()
  @IsOptional()
  telephone?: string

  @IsString()
  @IsOptional()
  niver?: string

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateRoleDto)
  role?: CreateRoleDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateTimeDto)
  time?: CreateTimeDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateWageDto)
  wage?: CreateWageDto
}
