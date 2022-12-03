import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appConfig, AppConfig } from '@nx-post/api/utils-config';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from '@nx-post/api/shared-utils-exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);

  app.enableCors();
  app.enableShutdownHooks();

  app.use(compression());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Post APIs')
    .setDescription('API documentation for Post')
    .setVersion('1.0.0')
    .addServer(config.domain)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.port, () => {
    Logger.log(
      `🚀 Application is running on: ${config.domain}`,
      'NestApplication'
    );
    Logger.log(
      `Swagger Docs enabled at: ${config.domain}/${globalPrefix}/docs`,
      'NestApplication'
    );
  });
}

bootstrap();
