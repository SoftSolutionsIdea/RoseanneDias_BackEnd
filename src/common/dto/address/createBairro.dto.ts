import { IsNotEmpty, IsString } from "class-validator";

export class CreateBairroDto {
    @IsString()
    @IsNotEmpty()
    bairro: string
}