import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './images.schema';
import { S3Service } from './s3.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    private readonly s3Service: S3Service,
  ) {}

  async getPresignedUploadUrl(filename: string, mimetype: string): Promise<{ url: string; key: string }> {
    const ext = filename.split('.').pop();
    const key = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const url = await this.s3Service.getPresignedUploadUrl(key, mimetype);
    return { url, key };
  }

  async getPresignedDownloadUrl(key: string): Promise<string> {
    return this.s3Service.getPresignedDownloadUrl(key);
  }

  async saveS3ImageMeta(meta: {
    key: string;
    filename: string;
    mimetype: string;
    size: number;
    type?: string;
    tenantId: string;
    metadata?: any;
  }): Promise<Image> {
    const url = this.s3Service.getPublicUrl(meta.key);
    const image = new this.imageModel({
      filename: meta.filename,
      mimetype: meta.mimetype,
      size: meta.size,
      url,
      tenantId: meta.tenantId,
      type: meta.type || 'other',
      metadata: meta.metadata || {},
      isActive: true,
    });
    return image.save();
  }

  async findAll(tenantId: string): Promise<Image[]> {
    return this.imageModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<Image | null> {
    return this.imageModel.findOne({ _id: id, tenantId }).exec();
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const image = await this.imageModel.findOne({ _id: id, tenantId }).exec();
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    if (image.url) {
      const key = image.url.split('.amazonaws.com/')[1];
      if (key) {
        await this.s3Service.deleteFile(key);
      }
    }
    await this.imageModel.deleteOne({ _id: id, tenantId }).exec();
  }

  async uploadFileToS3(file: any, tenantId: string): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const key = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    return this.s3Service.uploadFile(file.buffer, key, file.mimetype);
  }
} 