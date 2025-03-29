import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/services.configs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('login')
  login(@Body() loginuserdto: LoginDto) {
    return this.client.send('login.user', loginuserdto).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Post('register')
  register(@Body() registeruserdto: RegisterDto) {
    return this.client.send('register.user', registeruserdto).pipe(
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
