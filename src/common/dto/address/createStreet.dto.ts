import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStreetDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Cidade" não pode ser vazio'})
  street: string
}
