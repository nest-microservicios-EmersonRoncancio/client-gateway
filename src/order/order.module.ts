import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CommonModule } from 'src/common/common.module';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [OrderController],
  providers: [],
  imports: [CommonModule, NatsModule],
})
export class OrderModule {}
