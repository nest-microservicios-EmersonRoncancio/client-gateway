import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_CLIENT } from 'src/configs/services.configs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserType } from './interfaces/response.interface';
import { GetUser } from './decorator/getUser.decorator';
import { GetToken } from './decorator/getToken.decorator';

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

  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@GetUser() user: UserType, @GetToken() token: string) {
    return { user, token };
  }
}
