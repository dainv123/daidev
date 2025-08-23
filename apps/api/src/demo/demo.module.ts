import { Module } from '@nestjs/common';
import { AuthController } from './demo.controller';
import { UsersController } from './demo.controller';
import { ThemesController } from './demo.controller';
import { BlogsController } from './demo.controller';
import { CertificatesController } from './demo.controller';
import { TagsController } from './demo.controller';
import { ImagesController } from './demo.controller';
import { ContactMessagesController } from './demo.controller';
import { SiteSettingsController } from './demo.controller';

@Module({
  controllers: [
    AuthController,
    UsersController,
    ThemesController,
    BlogsController,
    CertificatesController,
    TagsController,
    ImagesController,
    ContactMessagesController,
    SiteSettingsController,
  ],
})
export class DemoModule {} 