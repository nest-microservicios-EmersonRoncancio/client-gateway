import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/configs/services.configs';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusOrderDto } from './dto/status-order.dto';

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

  @Get('find-all')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderClient
      .send({ cmd: 'findAllOrder' }, { ...paginationDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as string);
        }),
      );
  }

  @Get('find-id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send({ cmd: 'findOneOrder' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Patch('change-status/:id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() status: StatusOrderDto,
  ) {
    return this.orderClient
      .send({ cmd: 'changeOrderStatus' }, { id: id, ...status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as string);
        }),
      );
  }
}
