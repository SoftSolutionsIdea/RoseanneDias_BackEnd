import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBairroDto } from './createBairro.dto';
import { CreateStateDto } from './createState.dto';
import { CreateCityDto } from './createCity.dto';
import { CreateCepDto } from './createCep.dto';
import { CreateStreetDto } from './createStreet.dto';

export class CreateAddressDto {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    num: string;

    @IsString()
    @IsOptional()
    complement?: string;

    @ValidateNested()
    @Type(() => CreateCepDto)
    cep: CreateCepDto;

    @ValidateNested()
    @Type(() => CreateStreetDto)
    street: CreateStreetDto;

    @ValidateNested()
    @Type(() => CreateBairroDto)
    bairro: CreateBairroDto;

    @ValidateNested()
    @Type(() => CreateStateDto)
    state: CreateStateDto;

    @ValidateNested()
    @Type(() => CreateCityDto)
    city: CreateCityDto;
}
