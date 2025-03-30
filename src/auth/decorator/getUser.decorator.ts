import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseType, UserType } from '../interfaces/response.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserType => {
    const request: ResponseType = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new InternalServerErrorException('User not found');
    }

    return request.user;
  },
);
