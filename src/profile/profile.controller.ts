import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserParam } from '../decorators/user/user.decorator';
import { User } from '../users/entities/user.entity';
import { TokenGuard } from '../guards/token/token.guard';

@UseGuards(TokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }



  @Put()
  name(@Body() change_pass: ChangePasswordDto, @UserParam() user: User) {

    
    return this.profileService.change_passowrd(change_pass, user.id)
  }
}
