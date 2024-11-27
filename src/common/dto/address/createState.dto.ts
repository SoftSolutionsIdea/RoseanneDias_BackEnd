import { IsNotEmpty, IsString } from "class-validator";

export class CreateStateDto {
    @IsString()
    @IsNotEmpty()
    state: string
}