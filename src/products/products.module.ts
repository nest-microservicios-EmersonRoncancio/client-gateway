import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/configs/services.configs';
import { envs } from 'src/configs/dotenv.configs';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.HOST_PRODUCT_SERVICE,
          port: envs.PORT_PRODUCT_SERVICE,
        },
      },
    ]),
    CommonModule,
  ],
})
export class ProductsModule {}
