import { IsNotEmpty, IsString } from 'class-validator'

export class createStatusDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "status" não pode ser vazio' })
  status: string
}
