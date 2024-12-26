import { UserType } from "../enums/user-type.enum"

export class ShowUserDto {

    id: string
    name: string
    email: string
    user_type: UserType

}