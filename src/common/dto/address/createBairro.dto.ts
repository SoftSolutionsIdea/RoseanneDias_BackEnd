import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBairroDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Bairro" não pode ser vazio'})
  bairro: string
}
