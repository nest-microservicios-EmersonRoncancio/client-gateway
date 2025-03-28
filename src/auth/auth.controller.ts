import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/services.configs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('login')
  login() {
    return this.client.send('login.user', {}).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Post('register')
  register() {
    return this.client.send('register.user', {}).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Get('verify')
  verify() {
    return this.client.send('verify.user', {}).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }
}
