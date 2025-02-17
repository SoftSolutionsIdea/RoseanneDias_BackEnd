import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCityDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "Cidade" não pode ser vazio'})
  city: string
}
