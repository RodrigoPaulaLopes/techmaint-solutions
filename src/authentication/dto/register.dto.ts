import {IsEmail, IsNotEmpty, IsStrongPassword} from 'class-validator'
export class RegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4
    })
    @IsNotEmpty()
    password: string
}
