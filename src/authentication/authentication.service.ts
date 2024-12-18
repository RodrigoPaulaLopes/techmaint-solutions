import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { UserType } from '../users/enums/user-type.enum';
import { Permissions } from '../users/enums/permissions.enum';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService){

    }

    public async register({ email, password }: RegisterDto) {
        const user = await this.userRepository.findOne({ where: { email } });
      
        if (user) throw new HttpException("User already exists, try another credentials.", 400);
      
        const new_pass = await bcrypt.hash(password, 10);
        
        const new_user = this.userRepository.create({
          email,
          password: new_pass,
          user_type: UserType.ADMIN,
          permissions: [Permissions.VIEW_EQUIPMENT, Permissions.EDIT_SCHEDULES],
        });
      
        return await this.userRepository.save(new_user);
      }
    /**
     * name
     */
    public async login({ email, password }: RegisterDto) {
        const user = await this.userRepository.findOne({ where: { email } });
        if(!user) throw new HttpException("Credentials not valid", 400)

        const isSamePass = await bcrypt.compare(password, user.password)
        if(!isSamePass) throw new HttpException("credentials not valid", 400)

        const payload = { sub: user.id, username: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
          };

    }

}
