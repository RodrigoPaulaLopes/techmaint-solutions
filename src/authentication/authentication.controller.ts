import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { Validate } from 'class-validator';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }


  @Post("signup")
  public register(@Body() register: RegisterDto) {

    return this.authenticationService.register(register)
  }

  @Post("signin")
  public login(@Body() register: RegisterDto) {

    return this.authenticationService.login(register)
  }
}
