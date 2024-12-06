import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTimeDto {
  @IsString()
  @IsNotEmpty()
  time: string
}
