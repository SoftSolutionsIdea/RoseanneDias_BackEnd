import { IsNotEmpty, IsString } from 'class-validator';

export class createStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
