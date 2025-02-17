import { IsNotEmpty, IsString } from 'class-validator'

export class createImageDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "imagem" não pode ser vazio' })
  // @IsUrl()
  image: string
}
