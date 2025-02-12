import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateWageDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number
}
