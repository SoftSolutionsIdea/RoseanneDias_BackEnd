import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from '@prisma/client';

export class CreateContractDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  productId: string;

  @IsOptional() 
  @IsEnum(UserStatus, { message: 'Status deve ser Pending, Completed ou Canceled' })
  status?: UserStatus;
}
