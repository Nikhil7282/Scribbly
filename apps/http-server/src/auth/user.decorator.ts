import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { User } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';

export const user = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const u: User = request.user;
    return u;
  },
);

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}

export const GetUserFromToken = user;
