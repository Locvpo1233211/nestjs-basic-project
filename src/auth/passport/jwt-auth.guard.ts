import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PERMISSION, IS_PUBLIC_KEY } from '../decorator/customize';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const isPermission = this.reflector.getAllAndOverride<boolean>(
      IS_PERMISSION,
      [context.getHandler(), context.getClass()],
    );
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException(' Token is invalid');
    }
    const targetMethod = request.method;
    const targetPath = request.route?.path;
    const permissions = user.permissions;
    const isExit = permissions.find(
      (permissions) =>
        permissions.apiPath === targetPath &&
        permissions.method === targetMethod,
    );
    if (!isExit && !isPermission) {
      throw new ForbiddenException('You do not have permission to access');
    }
    return user;
  }
}
