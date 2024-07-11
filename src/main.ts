import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { BASE_URL } from './constants';

async function bootstrap() {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('BunkerDB Challenge')
    .setDescription('MarketingCampaigns')
    .setVersion('1.0')
    .addTag('MarketingCampaigns')
    .build();
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  app.use(helmet());
  SwaggerModule.setup(
    `${process.env.GLOBAL_PREFIX}/docs`,
    app,
    swaggerDocument,
  );
  await app.listen(process.env.PORT);
  Logger.log(`Listening to port: ${process.env.PORT}`, 'App');
  Logger.log(
    `Docs: ${BASE_URL}:${process.env.PORT}/${process.env.GLOBAL_PREFIX}/docs`,
    'App',
  );
}
bootstrap();
