import { Transform } from 'class-transformer';
import { IsUUID, IsDateString, IsString, IsBoolean } from 'class-validator';
import { parse } from 'date-fns';

export class CreateContractProductDto {
  @IsUUID()
  productId: string;

  @Transform(({ value }) => parse(value, 'dd/MM/yyyy', new Date()).toISOString())
  @IsDateString()
  testDate: string;

  @IsString()
  time: string;

  @IsBoolean()
  provaOk: boolean;

  @Transform(({ value }) => parse(value, 'dd/MM/yyyy', new Date()).toISOString())
  @IsDateString()
  withdrawalDate: string;

  @Transform(({ value }) => parse(value, 'dd/MM/yyyy', new Date()).toISOString())
  @IsDateString()
  returnDate: string;

  @Transform(({ value }) => parse(value, 'dd/MM/yyyy', new Date()).toISOString())
  @IsDateString()
  withdrawnDay: string;

  @Transform(({ value }) => parse(value, 'dd/MM/yyyy', new Date()).toISOString())
  @IsDateString()
  returnedDay: string;
}
