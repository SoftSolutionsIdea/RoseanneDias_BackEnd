import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCepDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "CEP" não pode ser vazio'})
  cep: string
}
