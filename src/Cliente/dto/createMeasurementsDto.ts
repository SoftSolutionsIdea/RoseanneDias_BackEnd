import { IsNumber, IsOptional } from 'class-validator'

export class CreateMeasurementsDto {
  @IsNumber()
  @IsOptional()
  ombro?: number

  @IsNumber()
  @IsOptional()
  busto?: number

  @IsNumber()
  @IsOptional()
  coOmbroCintura?: number

  @IsNumber()
  @IsOptional()
  coOmbroCos?: number

  @IsNumber()
  @IsOptional()
  coCorpoTQC?: number

  @IsNumber()
  @IsOptional()
  cintura?: number

  @IsNumber()
  @IsOptional()
  cos?: number

  @IsNumber()
  @IsOptional()
  quadril?: number

  @IsNumber()
  @IsOptional()
  SaiaCurta?: number

  @IsNumber()
  @IsOptional()
  SaiaLonga?: number

  @IsNumber()
  @IsOptional()
  Short?: number

  @IsNumber()
  @IsOptional()
  Calca?: number

  @IsNumber()
  @IsOptional()
  Vestido?: number

  @IsNumber()
  @IsOptional()
  Manga?: number

  @IsNumber()
  @IsOptional()
  punho?: number

  @IsNumber()
  @IsOptional()
  Frente?: number

  @IsNumber()
  @IsOptional()
  OmbroAOmbro?: number
}
