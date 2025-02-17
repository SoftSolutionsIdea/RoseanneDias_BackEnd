import { IsNotEmpty, IsString } from 'class-validator'

export class createRentalDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo "aluguel" não pode ser vazio' })
  rental: string
}
