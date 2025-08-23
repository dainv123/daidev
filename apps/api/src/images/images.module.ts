import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image, ImageSchema } from './images.schema';
import { S3Service } from './s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, S3Service],
  exports: [ImagesService],
})
export class ImagesModule {} 