import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsCPFOrCNPJ } from 'src/common/dto/cpf_cnpj'
import { CreateAddressDto } from 'src/common/dto/address/createAddress.dto'
import { CreateMeasurementsDto } from './createMeasurementsDto'

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail({}, { message: 'Email inválido' })
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'Email precisa ser um endereço de gmail',
  })
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  instagram?: string

  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  @IsOptional()
  telephone_1?: string

  @IsString()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
  @IsOptional()
  telephone_2?: string

  @IsDateString({}, { message: 'Formato inválido da data' })
  @IsOptional()
  niver?: string

  @IsString()
  @IsOptional()
  rg?: string

  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF precisa ser do formato XXX.XXX.XXX-XX',
  })
  @IsOptional()
  cpf_cnpj?: string

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateMeasurementsDto)
  measurements?: CreateMeasurementsDto
}