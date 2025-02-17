import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateWageDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O campo "Salário" não pode ser vazio' })
  amount: number
}
