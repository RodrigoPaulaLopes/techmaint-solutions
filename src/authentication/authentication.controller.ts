import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { Validate } from 'class-validator';
import { SendCodeDto } from './dto/send_code.dto';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }


  @Post("signup")
  public register(@Body() register: RegisterDto) {

    return this.authenticationService.register(register)
  }

  @Post("signin")
  public login(@Body() register: LoginDto) {

    return this.authenticationService.login(register)
  }

  @Post("send_code")
  public send_code_to_change_password(@Body() register: SendCodeDto) {

    return this.authenticationService.send_code_to_change_password(register)
  }
  @Post("reset_password")
  public reset_password(@Body() register: ResetPasswordDto) {

    return this.authenticationService.reset_password(register)
  }
}
