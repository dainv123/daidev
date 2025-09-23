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

  // Temporarily disable helmet to test CORS
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //     crossOriginEmbedderPolicy: false,
  //     crossOriginOpenerPolicy: false,
  //     crossOriginResourcePolicy: false,
  //   })
  // );

  const allowedOrigins = (configService.get('FRONTEND_URLS') || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  // Add all subdomains and main domain (HTTP only - no SSL)
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3002', 
    'http://localhost:3003',
    'http://localhost:3004',
    'http://daidev.click',
    'http://www.daidev.click',
    'http://api.daidev.click',
    'http://admin.daidev.click',
    'http://docs.daidev.click',
    'http://theme.daidev.click',
    'http://swagger.daidev.click'
  ];

  const allOrigins = [...new Set([...allowedOrigins, ...defaultOrigins])];
 
  // Custom CORS middleware to avoid duplicate headers
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Check if origin is allowed
    if (allOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Expose-Headers', 'Content-Range, X-Content-Range');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  });
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
