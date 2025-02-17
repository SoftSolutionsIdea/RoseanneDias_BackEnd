import { IsNotEmpty, IsString } from 'class-validator'

export class createCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "categoria" não pode ser vazio' })
  category: string
}
