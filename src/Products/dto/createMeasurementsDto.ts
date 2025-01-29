import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CreateProductsDto } from './createProducts.dto'; // Importe o DTO de Products, se necessário

export class CreateMeasurementsDto {
  @IsNumber()
  @IsOptional()
  ombro?: number;

  @IsNumber()
  @IsOptional()
  busto?: number;

  @IsNumber()
  @IsOptional()
  coOmbroCintura?: number;

  @IsNumber()
  @IsOptional()
  coOmbroCos?: number;

  @IsNumber()
  @IsOptional()
  coCorpoTQC?: number;

  @IsNumber()
  @IsOptional()
  cintura?: number;

  @IsNumber()
  @IsOptional()
  cos?: number;

  @IsNumber()
  @IsOptional()
  quadril?: number;

  @IsNumber()
  @IsOptional()
  SaiaCurta?: number;

  @IsNumber()
  @IsOptional()
  SaiaLonga?: number;

  @IsNumber()
  @IsOptional()
  Short?: number;

  @IsNumber()
  @IsOptional()
  Calca?: number;

  @IsNumber()
  @IsOptional()
  Vestido?: number;

  @IsNumber()
  @IsOptional()
  comprimentoManga?: number;

  @IsNumber()
  @IsOptional()
  punho?: number;

  @IsNumber()
  @IsOptional()
  medidaFrente?: number;

  @IsNumber()
  @IsOptional()
  medidaOmbroOmbro?: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateProductsDto) // Relacionamento com o DTO de Products
  product: CreateProductsDto;
}