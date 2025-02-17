import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStateDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Estado" não pode ser vazio'})
  state: string
}
