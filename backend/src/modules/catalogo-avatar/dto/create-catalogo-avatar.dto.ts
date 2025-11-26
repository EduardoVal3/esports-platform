import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCatalogoAvatarDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    seed: string;

    @IsString()
    @IsOptional()
    categoria?: string;

    @IsBoolean()
    @IsOptional()
    disponible?: boolean;

    @IsBoolean()
    @IsOptional()
    premium?: boolean;
}
