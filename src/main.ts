import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { HttpModule } from './http/http.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()

    .setTitle('Farm Management API')
    .setDescription(
      'An API that allows you to manage your farm. It provides endpoints for managing farmers, farms, and reports.',
    )
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [HttpModule],
    extraModels: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('/', app, document, {
    useGlobalPrefix: true,
    customSiteTitle: 'Farm Management API',
    jsonDocumentUrl: '/api.json',
    yamlDocumentUrl: '/api.yaml',
  });

  await app.listen(process.env.PORT || 3333);

  Logger.verbose(
    `Running API on http://localhost:${process.env.PORT || 3333}`,
    'Main.ts',
  );
}
bootstrap();
