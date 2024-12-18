import {IsEmail, IsNotEmpty, isStrongPassword, IsStrongPassword} from 'class-validator'
export class ResetPasswordDto {

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4
    })
    @IsNotEmpty()
    password: string

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4
    })
    @IsNotEmpty()
    new_password: string


    @IsNotEmpty()
    code: string

}
