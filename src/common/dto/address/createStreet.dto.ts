import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStreetDto {
  @IsString()
  @IsNotEmpty()
  street: string
}
