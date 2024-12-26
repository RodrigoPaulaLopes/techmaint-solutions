import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"


export class UpdateProfileDto {

    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

   
}