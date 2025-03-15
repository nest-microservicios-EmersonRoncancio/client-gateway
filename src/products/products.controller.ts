import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_CLIENT } from 'src/configs/services.configs';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Get()
  findAllProduct(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'findAll_product' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Get(':id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'findOne_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }

  @Patch(':id')
  updateOneProduct(
    @Body() updateProctoDto: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { id, ...updateProctoDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error as string);
        }),
      );
  }

  @Delete(':id')
  deleteOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'remove_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error as string);
      }),
    );
  }
}
