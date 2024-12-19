import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }
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

      request.tokenPayload = data
      return true;
            
    } catch (error) {
      throw new HttpException("token invalid", 401)
    
    }

  }
}
