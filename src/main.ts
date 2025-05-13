// eslint-disable-next-line @typescript-eslint/no-require-imports
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Student union workplace API')
    .setDescription('API корп. системы Союза Студентов ИРИТ-РТФ')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(5000);
}
bootstrap();
