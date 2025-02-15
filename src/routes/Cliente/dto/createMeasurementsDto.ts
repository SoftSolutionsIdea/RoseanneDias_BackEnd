import { Transform } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateMeasurementsDto {
  @IsNumber({}, { message: 'O campo "Ombro" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  ombro?: number

  @IsNumber({}, { message: 'O campo "Busto" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  busto?: number

  @IsNumber(
    {},
    {
      message: 'O campo "Comprimento Ombro-Cintura" deve ser um número válido.',
    },
  )
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coOmbroCintura?: number

  @IsNumber(
    {},
    { message: 'O campo "Comprimento Ombro-Cós" deve ser um número válido.' },
  )
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coOmbroCos?: number

  @IsNumber(
    {},
    { message: 'O campo "Comprimento Corpo TQC" deve ser um número válido.' },
  )
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  coCorpoTQC?: number

  @IsNumber({}, { message: 'O campo "Cintura" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  cintura?: number

  @IsNumber({}, { message: 'O campo "Cós" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  cos?: number

  @IsNumber({}, { message: 'O campo "Quadril" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  quadril?: number

  @IsNumber({}, { message: 'O campo "Saia Curta" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  SaiaCurta?: number

  @IsNumber({}, { message: 'O campo "Saia Longa" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  SaiaLonga?: number

  @IsNumber({}, { message: 'O campo "Short" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Short?: number

  @IsNumber({}, { message: 'O campo "Calça" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Calca?: number

  @IsNumber({}, { message: 'O campo "Vestido" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Vestido?: number

  @IsNumber({}, { message: 'O campo "Manga" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Manga?: number

  @IsNumber({}, { message: 'O campo "Punho" deve ser um número válido.' })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  punho?: number

  @IsNumber({}, { message: "O campo 'Frente' deve ser um número válido." })
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  Frente?: number

  @IsNumber(
    {},
    { message: 'O campo "Ombro a Ombro" deve ser um número válido.' },
  )
  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  OmbroAOmbro?: number
}
