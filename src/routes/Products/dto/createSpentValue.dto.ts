import { IsNotEmpty, IsNumber } from 'class-validator'

export class createSpentValueDto {
  @IsNumber()
  @IsNotEmpty()
  spentValue: number
}
