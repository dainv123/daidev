import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const expressApp = express();
  // Serve Swagger UI static files FIRST, before Nest app
  expressApp.use('/swagger-static', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  const configService = app.get(ConfigService);
  const port = 3001;

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  const allowedOrigins = (configService.get('FRONTEND_URLS') || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  // Add all subdomains and main domain
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3002', 
    'http://localhost:3003',
    'http://localhost:3004',
    'https://daidev.click',
    'https://www.daidev.click',
    'https://api.daidev.click',
    'https://admin.daidev.click',
    'https://docs.daidev.click',
    'https://theme.daidev.click',
    'https://swagger.daidev.click'
  ];

  const allOrigins = [...new Set([...allowedOrigins, ...defaultOrigins])];
/*
  app.enableCors({
    origin: allOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });
*/
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

  app.setGlobalPrefix('api/v1');

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('DaiDev Portfolio API')
    .setDescription('API for portfolio management system with multi-tenancy support')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Themes', 'Theme management endpoints')
    .addTag('Blogs', 'Blog management endpoints')
    .addTag('Certificates', 'Certificate management endpoints')
    .addTag('Tags', 'Tag management endpoints')
    .addTag('Images', 'Image management endpoints')
    .addTag('Contact Messages', 'Contact message management endpoints')
    .addTag('Site Settings', 'Site settings management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve only the unique Swagger JSON spec
  app.use('/docs-json', (req, res) => {
    res.json(document);
  });

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting application:', error);
  process.exit(1);
}); 
