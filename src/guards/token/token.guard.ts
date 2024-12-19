import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService,  private readonly userService: UsersService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {

      const request = context.switchToHttp().getRequest()
      const { authorization } = request.headers
      if (!authorization) throw new HttpException("Token invalid", 401)

      const [prefix, token] = authorization.split(" ")

      if (!prefix || prefix !== 'Bearer') throw new HttpException("Token invalid", 401)

      const data = this.jwtService.verify(token)

      const user = this.userService.findOne(data.sub)

      if(!user) throw new HttpException("Token invalid", 401)

      request.user = user
      return true;
            
    } catch (error) {
      throw new HttpException("token invalid", 401)
    
    }

  }
}
