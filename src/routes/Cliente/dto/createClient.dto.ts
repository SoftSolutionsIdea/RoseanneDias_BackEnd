import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsCPFOrCNPJ } from 'src/common/dto/cpf_cnpj'
import { CreateAddressDto } from 'src/common/dto/address/createAddress.dto'
import { CreateMeasurementsDto } from './createMeasurementsDto'

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "nome" não pode ser vazio'})
  name: string

  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio'})
  @IsEmail({}, { message: 'Email inválido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email precisa ser um endereço de gmail',
  })
  email: string

  @IsString()
  @IsOptional()
  instagram: string

  @IsNotEmpty({ message: 'O campo "Telefone" não pode ser vazio'})
  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  telephone_1: string

  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  @IsOptional()
  telephone_2: string

  @IsDateString({}, { message: 'Formato inválido da data' })
  niver: string

  @IsNotEmpty({ message: 'O campo "RG" não pode ser vazio'})
  @IsString()
  rg: string

  @IsNotEmpty({ message: 'O campo "CPF ou CNPJ" não pode ser vazio'})
  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'cpf ou CNPJ precisa ser válido, precisa estar no formato (000.000.000-00)',
  })
  cpf_cnpj: string

  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateMeasurementsDto)
  measurements?: CreateMeasurementsDto
}
