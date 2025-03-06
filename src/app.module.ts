import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductsModule, CommonModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
