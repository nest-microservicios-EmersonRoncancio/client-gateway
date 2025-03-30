import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { ResponseType } from '../interfaces/response.interface';

export const GetToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req: ResponseType = ctx.switchToHttp().getRequest();
    const token = req.token;

    if (!token) throw new InternalServerErrorException('Token not found');

    return token;
  },
);
