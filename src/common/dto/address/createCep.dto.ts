import { IsNotEmpty, IsString } from "class-validator";

export class CreateCepDto {
    @IsString()
    @IsNotEmpty()
    cep: string
}