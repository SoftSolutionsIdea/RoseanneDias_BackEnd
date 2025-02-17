import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTimeDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Horário" não pode ser vazio' })
  time: string
}
