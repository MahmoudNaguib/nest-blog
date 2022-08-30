//import { ValidationPipe } from '@nestjs/common';
import { ValidationPipe } from './Pipes/ValidationPipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /// serving public/uploads
  app.useStaticAssets(join(__dirname, '..', 'public/uploads'), {
    prefix: '/uploads/',
  });
  /// serving public/assets
  app.useStaticAssets(join(__dirname, '..', 'public/assets'), {
    prefix: '/assets/',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
