import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class ProfileService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


    async update({ email, name }: UpdateProfileDto, id: string) {

        console.log("=========================")
        console.log(id)
        console.log("=========================")
        const user = await this.userRepository.findOneBy({ email: email })


        if(!user) throw new BadRequestException("There is not profile with this email")

        if (user.id !== id) throw new BadRequestException("You cannot use this email.")

        const new_user = { ...user, email: email, name: name }

        await this.userRepository.update(id, new_user)
        return await this.userRepository.findOneBy({ id })

    }
    async change_passowrd({ confirm_new_password, old_password, new_password }: ChangePasswordDto, id: string) {

        const user = await this.userRepository.findOneBy({ id: id })
        // verify if password is the same password

        const pass = await compare(old_password, user.password)

        if (!pass) throw new BadRequestException("The password does not match the current password.")

        // verify if the new passowrd is equal to confirm password

        if (new_password !== confirm_new_password) throw new BadRequestException("Passwords do not match. The confirmation password must be the same as the new password.")


        const hash_pass = await hash(new_password, 10)

        user.password = hash_pass
        await this.userRepository.update(id, user)
        return await this.userRepository.findOneBy({ id: id })

    }
}
