import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findAllProduct() {
    return 'This action returns all products';
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
