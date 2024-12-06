import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateWageDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number
}
