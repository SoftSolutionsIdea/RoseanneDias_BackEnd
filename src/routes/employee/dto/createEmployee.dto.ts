// src/employee/dtos/updateEmployee.dto.ts
import {
  IsEmail,
  IsString,
  ValidateNested,
  IsNotEmpty,
  Matches,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CreateRoleDto } from './createRole.dto'
import { CreateAddressDto } from '../../../common/dto/address/createAddress.dto'
import { CreateTimeDto } from './createTime.dto'
import { CreateWageDto } from './createWage.dto'
import { IsCPFOrCNPJ } from 'src/common/dto/cpf_cnpj'

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Nome" não pode ser vazio' })
  name: string

  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio' })
  @IsEmail({}, { message: 'Email inválido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email precisa ser um endereço de gmail',
  })
  email: string

  @IsNotEmpty({ message: 'O campo "CPF" não pode ser vazio' })
  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF precisa estar no formato válido (000.000.000-00)',
  })
  cpf: string

  @IsNotEmpty({ message: 'O campo "Telefone" não pode ser vazio' })
  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  telephone: string

  @IsNotEmpty({ message: 'O campo "Data de Nascimento" não pode ser vazio' })
  @IsDateString({}, { message: 'Formato inválido da data' })
  niver: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Cargo" não pode ser vazio' })
  @Type(() => CreateRoleDto)
  role: CreateRoleDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Endereço" não pode ser vazio' })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Horário" não pode ser vazio' })
  @Type(() => CreateTimeDto)
  time: CreateTimeDto

  @ValidateNested()
  @IsNotEmpty({ message: 'O campo "Salário" não pode ser vazio' })
  @Type(() => CreateWageDto)
  wage: CreateWageDto
}