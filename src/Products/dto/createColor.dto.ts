import { IsNotEmpty, IsString } from 'class-validator';

export class createColorDto {
  @IsString()
  @IsNotEmpty()
  color: string;
}
