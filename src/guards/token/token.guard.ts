import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new HttpException('Authorization header is missing', 401);
    }

    const [prefix, token] = authorization.split(' ');

    if (!prefix || prefix !== 'Bearer' || !token) {
      throw new HttpException('Invalid token format', 401);
    }

    try {
      const data = this.jwtService.verify(token);
      

      const user = await this.userService.findOne(data.sub);

      if (!user) {
        throw new HttpException('User not found', 401);
      }

      request.userPayload = data;
      request.user = user;

      return true;
    } catch (error) {
      throw new HttpException('Invalid token or user', 401);
    }
  }
}
