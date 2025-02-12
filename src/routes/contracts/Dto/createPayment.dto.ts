import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator'

export class CreateContractPaymentDto {
  @IsString()
  paymentMethod: string

  @IsDateString()
  paymentDate: string

  @IsOptional()
  @IsString()
  flag?: string

  @IsNumber()
  paymentAmount: number
}
