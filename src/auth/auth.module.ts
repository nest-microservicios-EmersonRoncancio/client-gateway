import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/nats/nats.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [AuthController],
  imports: [NatsModule, CommonModule],
})
export class AuthModule {}
