import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfiguration } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || appConfiguration.defaultApiPort);
}

bootstrap();
