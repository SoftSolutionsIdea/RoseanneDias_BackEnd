import { Type } from 'class-transformer'
import {
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
  @IsNotEmpty()
  name: string

  @IsEmail({}, { message: 'Email inválido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email precisa ser um endereço de gmail',
  })
  email: string

  @IsString()
  @IsOptional()
  instagram: string

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

  @IsString()
  rg: string

  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'cpf ou CNPJ precisa ser válido',
  })
  cpf_cnpj: string

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  addressCli: CreateAddressDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateMeasurementsDto)
  measurements?: CreateMeasurementsDto
}
