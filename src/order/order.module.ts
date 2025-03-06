import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CommonModule } from 'src/common/common.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/configs/services.configs';
import { envs } from 'src/configs/dotenv.configs';

@Module({
  controllers: [OrderController],
  providers: [],
  imports: [
    CommonModule,
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.HOST_ORDER_SERVICE,
          port: envs.PORT_ORDER_SERVICE,
        },
      },
    ]),
  ],
})
export class OrderModule {}
