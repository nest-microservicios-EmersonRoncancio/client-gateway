import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { OrderModule } from './order/order.module';
import { NatsModule } from './nats/nats.module';
import { AuthModule } from './auth/auth.module';
import { HealtCheckModule } from './healt-check/healt-check.module';

@Module({
  imports: [
    ProductsModule,
    CommonModule,
    OrderModule,
    NatsModule,
    AuthModule,
    HealtCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
