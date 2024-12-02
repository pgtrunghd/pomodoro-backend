import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from 'cors.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
