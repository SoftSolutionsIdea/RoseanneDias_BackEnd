import { IsUUID, IsDateString, IsString, IsBoolean } from 'class-validator';

export class CreateContractProductDto {
  @IsUUID()
  productId: string;

  @IsDateString()
  testDate: string;

  @IsString()
  time: string;

  @IsBoolean()
  provaOk: boolean;

  @IsDateString()
  withdrawalDate: string;

  @IsDateString()
  returnDate: string;

  @IsDateString()
  withdrawnDay: string;

  @IsDateString()
  returnedDay: string;
}
