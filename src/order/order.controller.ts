import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/configs/services.configs';
import { catchError } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send({ cmd: 'createOrder' }, createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Get()
  findAll() {
    return this.orderClient.send({ cmd: 'findAllOrder' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderClient.send({ cmd: 'findOneOrder' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }
}
