import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CommonModule } from 'src/common/common.module';
import { NatsModule } from 'src/nats/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [CommonModule, NatsModule, AuthModule],
})
export class ProductsModule {}
