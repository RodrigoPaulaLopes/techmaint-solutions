import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { UserType } from '../users/enums/user-type.enum';
import { Permissions } from '../users/enums/permissions.enum';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { SendCodeDto } from './dto/send_code.dto';
import { ResetPasswordDto } from './dto/reset_password.dto';
@Injectable()
export class AuthenticationService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService) {

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
    if (!user) throw new HttpException("Credentials not valid", 400)

    const isSamePass = await bcrypt.compare(password, user.password)
    if (!isSamePass) throw new HttpException("credentials not valid", 400)

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  /**
   * send_code_to_change_password
   */
  public async send_code_to_change_password({ email }: SendCodeDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new HttpException("User not valid", 400)

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15); 


    user.reset_password_code = resetCode;
    user.reset_password_expires = expirationTime;
    await this.userRepository.save(user);

    return this.emailService.sendEmail(email, "Password Reset Code", `<strong>Your password reset code is ${resetCode}. It expires in 15 minutes.</strong>`)
  }

  /**
   * reset_password
   */
  public async reset_password({password, new_password, code}: ResetPasswordDto) {
    
    const user = await this.userRepository.findOne({where: {reset_password_code: code}})

    if(!user) throw new HttpException("invalid code", 400)
      const now = new Date()
    if(user.reset_password_expires < now) throw new HttpException("code expired!", 400)

    if(password !== new_password) throw new HttpException("The password have to be equal", 400)
    
    user.password = await bcrypt.hash(password, 10)
    user.reset_password_code = null;
    user.reset_password_expires = null;

    await this.userRepository.save(user)

    return {"mnessage": "password updated with success"} 
  }

}
