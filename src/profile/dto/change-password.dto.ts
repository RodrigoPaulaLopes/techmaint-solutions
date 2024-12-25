import { IsStrongPassword } from "class-validator"


export class ChangePasswordDto {

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4,
        minLowercase: 1
    })
    old_password: string

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4,
        minLowercase: 1
    })
    new_password: string

    @IsStrongPassword({
        minLength: 10,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 4,
        minLowercase: 1
    })
    confirm_new_password: string

}