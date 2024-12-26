import { IsOptional, IsString } from "class-validator";

export class CreateMachineDto {
    @IsString()
    name: string;

    @IsString()
    manufacturer: string;

    @IsOptional()
    @IsString()
    description?: string;
}
