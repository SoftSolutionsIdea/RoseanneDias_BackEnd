// src/employee/dtos/updateEmployee.dto.ts
import {
  IsEmail,
  IsString,
  ValidateNested,
  IsNotEmpty,
  Matches,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRoleDto } from './createRole.dto';
import { CreateAddressDto } from '../../common/dto/address/createAddress.dto';
import { CreateTimeDto } from './createTime.dto';
import { CreateWageDto } from './createWage.dto';
import { IsCPFOrCNPJ } from 'src/common/dto/cpf_cnpj';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email precisa ser um endereço de gmail',
  })
  email: string;

  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  cpf: string;

  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  telephone: string;

  @IsDateString({}, { message: 'Formato inválido da data' })
  niver: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateRoleDto)
  role: CreateRoleDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateTimeDto)
  time: CreateTimeDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateWageDto)
  wage: CreateWageDto;
}
