import { Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/configs/services.configs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findAllProduct() {
    return this.productClient.send({ cmd: 'findAll_product' }, {});
  }

  @Get(':id')
  findOneProduct() {
    return 'This action returns a #${id} product';
  }

  @Patch(':id')
  updateOneProduct() {
    return 'This action updates a #${id} product';
  }

  @Delete(':id')
  deleteOneProduct() {
    return 'This action removes a #${id} product';
  }
}
