// src/employee/dtos/updateEmployee.dto.ts
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateRoleDto } from './createRole.dto'
import { CreateAddressDto } from '../../../common/dto/address/createAddress.dto'
import { CreateTimeDto } from './createTime.dto'
import { CreateWageDto } from './createWage.dto'
import { IsCPFOrCNPJ } from 'src/common/dto/cpf_cnpj'

export class updateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
    @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
      message: 'Email precisa ser um endereço de gmail',
    })
  @IsOptional()
  email?: string
  
  @IsNotEmpty({ message: 'O campo "CPF" não pode ser vazio' })
  @IsCPFOrCNPJ({ message: 'CPF inválido!' })
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      message: 'CPF precisa estar no formato válido (000.000.000-00)',
    })
  @IsString()
  @IsOptional()
  cpf?: string

  @IsNotEmpty({ message: 'O campo "Telefone" não pode ser vazio' })
    @IsString()
    @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message:
        'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
    })
  @IsOptional()
  telephone?: string

  @IsNotEmpty({ message: 'O campo "Data de Nascimento" não pode ser vazio' })
  @IsDateString({}, { message: 'Formato inválido da data' })
  @IsOptional()
  niver?: string

  @IsNotEmpty({ message: 'O campo "Cargo" não pode ser vazio' })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateRoleDto)
  role?: CreateRoleDto

  @IsNotEmpty({ message: 'O campo "adress" não pode ser vazio' })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto

  @IsNotEmpty({ message: 'O campo "time" não pode ser vazio' })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateTimeDto)
  time?: CreateTimeDto

  @IsNotEmpty({ message: 'O campo "wage" não pode ser vazio' })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateWageDto)
  wage?: CreateWageDto
}
