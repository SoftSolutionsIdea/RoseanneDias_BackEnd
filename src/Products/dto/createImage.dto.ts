import { IsNotEmpty, IsString } from 'class-validator'

export class createImageDto {
  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  image: string
}
