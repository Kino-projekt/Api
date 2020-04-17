import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles: UserRole[] = this.reflector.get<UserRole[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user === undefined) {
            return false;
        }

        return this.matchRoles(roles, user.role);
    }

    matchRoles(roles: Array<string>, userRole: string) {
        return roles.includes(userRole);
    }
}