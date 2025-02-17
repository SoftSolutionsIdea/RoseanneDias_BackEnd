import { IsNotEmpty, IsNumber } from 'class-validator'

export class createSpentValueDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O campo "valor gasto" não pode ser vazio' })
  spentValue: number
}
