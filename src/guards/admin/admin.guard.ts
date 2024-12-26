import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UserType } from '../../users/enums/user-type.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || user.user_type !== UserType.ADMIN) {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true;
  }
}
