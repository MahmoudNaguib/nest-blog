//import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  /*app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });*/
  await app.listen(3000);
}
bootstrap();
