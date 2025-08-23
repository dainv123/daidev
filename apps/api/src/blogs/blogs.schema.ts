import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  title: { en: string; vi: string };

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  content: { en: string; vi: string };

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  excerpt: { en: string; vi: string };

  @Prop({ required: true })
  coverImage: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  author: { en: string; vi: string };

  @Prop({ required: true })
  slug: string;

  @Prop({ default: 5 })
  readTime: number;

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop()
  publishedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Export the document type
export type BlogDocument = Blog & Document;

// Indexes
BlogSchema.index({ tenantId: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ publishedAt: 1 }); 