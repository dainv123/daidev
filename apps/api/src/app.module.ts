import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
// import { TerminusModule } from '@nestjs/terminus';
import { Logger, LoggerService } from '@nestjs/common';

// Simple modules
import { HealthModule } from './health/health.module';

// Core modules - all required modules according to documentation
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThemesModule } from './themes/themes.module';
import { BlogsModule } from './blogs/blogs.module';
import { CertificatesModule } from './certificates/certificates.module';
import { TagsModule } from './tags/tags.module';
import { ImagesModule } from './images/images.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { SkillsModule } from './skills/skills.module';
import { LanguagesModule } from './languages/languages.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';

// Middleware - temporarily commented out
// import { TenantMiddleware } from './shared/middlewares/tenant.middleware';

// Configuration
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    
    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        // uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    
    // Security and performance
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    // TerminusModule,
    
    // Simple modules
    HealthModule,
    
    // Feature modules - all required modules according to documentation
    AuthModule,
    UsersModule,
    ThemesModule,
    BlogsModule,
    CertificatesModule,
    TagsModule,
    ImagesModule,
    ContactMessagesModule,
    SiteSettingsModule,
    SkillsModule,
    LanguagesModule,
    ExperienceModule,
    EducationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: 'CORS_ORIGIN',
      useFactory: (configService: ConfigService) => configService.get('CORS_ORIGIN') || '*',
      inject: [ConfigService],
    },
    {
      provide: Logger,
      useFactory: (configService: ConfigService) => {
        const logger = new Logger();
        return logger;
      },
      inject: [ConfigService],
    },
    // TenantMiddleware, // temporarily commented out
  ],
})
export class AppModule {} 