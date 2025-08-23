import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  type: string; // 'theme', 'blog', 'certificate', 'avatar'

  @Prop({ type: Object })
  metadata: {
    width?: number;
    height?: number;
    format?: string;
    cloudinaryId?: string;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image); 