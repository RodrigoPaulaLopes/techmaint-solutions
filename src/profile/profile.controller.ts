import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserParam } from '../decorators/user/user.decorator';
import { User } from '../users/entities/user.entity';
import { TokenGuard } from '../guards/token/token.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@UseGuards(TokenGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  show(@UserParam() user: User){
    return this.profileService.show(user.id)
  }
  @Put()
  update(@Body() update: UpdateProfileDto, @UserParam() user: User) {
    
    
    return this.profileService.update(update, user.id)
  }
  @Put('change_password')
  change_password(@Body() change_pass: ChangePasswordDto, @UserParam() user: User) {

    
    return this.profileService.change_passowrd(change_pass, user.id)
  }
}
