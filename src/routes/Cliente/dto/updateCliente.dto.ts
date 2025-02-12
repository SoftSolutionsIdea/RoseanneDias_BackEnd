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
  email?: string

  @IsString()
  @IsOptional()
  instagram?: string

  @IsString()
  @IsOptional()
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
    message:
      'Número de telefone deve estar no formato (XX) XXXX-XXXX OU (XX) XXXXX-XXXX',
  })
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
  @Matches(/^\d{2}\.\d{3}\.\d{3}-\d{1}$/, {
    message: 'RG precisa ser do formato XX.XXX.XXX-XX',
  })
  rg?: string

  @IsCPFOrCNPJ({ message: 'CPF ou CNPJ inválido!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'cpf precisa ser do formato XXX.XXX.XXX-XX',
  })
  @IsOptional()
  cpf_cnpj?: string

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateAddressDto)
  addressCli?: CreateAddressDto

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateMeasurementsDto)
  measurements?: CreateMeasurementsDto
}
