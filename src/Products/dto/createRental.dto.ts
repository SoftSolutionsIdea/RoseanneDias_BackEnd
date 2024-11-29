import { IsNotEmpty, IsString } from 'class-validator';

export class createRentalDto {
  @IsString()
  @IsNotEmpty()
  rental: string;
}
