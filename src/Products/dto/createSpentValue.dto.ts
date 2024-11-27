import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSpentValueDto{
    @IsNumber()
    @IsNotEmpty()
    spentValue: number
}