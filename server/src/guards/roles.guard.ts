import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { users_role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<users_role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const {
      user: { role },
    } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true;
    }

    switch (role) {
      case users_role.admin: {
        return true;
      }
      case users_role.member: {
        if (requiredRoles.includes(users_role.admin)) {
          throw new ForbiddenException('Доступ закрыт');
        }
        return true;
      }
      case users_role.old: {
        if (
          requiredRoles.includes(users_role.admin) ||
          requiredRoles.includes(users_role.member)
        ) {
          throw new ForbiddenException('Доступ закрыт');
        }
        return (
          !requiredRoles.includes(users_role.admin) &&
          !requiredRoles.includes(users_role.member)
        );
      }
      default: {
        return false;
      }
    }
  }
}
