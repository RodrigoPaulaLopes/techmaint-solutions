import {IsEmail, IsNotEmpty, IsStrongPassword} from 'class-validator'
export class SendCodeDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

}
