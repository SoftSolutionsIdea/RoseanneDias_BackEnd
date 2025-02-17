import { IsNotEmpty, IsString } from 'class-validator'

export class createColorDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "cor" não pode ser vazio' })
  color: string
}
