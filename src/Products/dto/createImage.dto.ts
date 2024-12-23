import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class createImageDto {
  @IsString()
  @IsNotEmpty()
  // @IsUrl()
  image: string
}
