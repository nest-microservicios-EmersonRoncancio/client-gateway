import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './configs/dotenv.configs';
import { ExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('Bienvenido a la API');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(envs.PORT);
}
bootstrap().catch(console.error);
