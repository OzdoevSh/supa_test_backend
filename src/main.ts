import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.use(requestIp.mw());

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on port ${await app.getUrl()}`);
}

bootstrap();
