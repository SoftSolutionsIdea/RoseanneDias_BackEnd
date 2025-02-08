import { IsUUID, IsDateString, IsEnum, IsOptional, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserStatus } from '@prisma/client';
import { CreateContractProductDto } from './createcontractProduct.dto';
import { CreateContractPaymentDto } from './createPayment.dto';


export class CreateContractDto {
  @IsUUID()
  clientId: string;

  @IsDateString()
  eventDate: string;

  @IsString()
  seller: string;

  @IsString()
  occasion: string;

  @IsString()
  eventLocation: string;

  @IsString()
  eventName: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsNumber()
  discountPercentage?: number;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'Status deve ser Pending, Completed ou Canceled' })
  status?: UserStatus;

  @ValidateNested({ each: true })
  @Type(() => CreateContractProductDto)
  products: CreateContractProductDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateContractPaymentDto)
  payments: CreateContractPaymentDto[];
}
