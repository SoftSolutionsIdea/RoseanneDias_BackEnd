import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateMeasurementsDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  ombro?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  busto?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coOmbroCintura?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coOmbroCos?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coCorpoTQC?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  cintura?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  cos?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  quadril?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  SaiaCurta?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  SaiaLonga?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Short?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Calca?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Vestido?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Manga?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  punho?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Frente?: number

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  OmbroAOmbro?: number
}
