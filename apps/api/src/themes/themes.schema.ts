import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Theme extends Document {
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
  description: { en: string; vi: string };

  @Prop({ required: true })
  previewImage: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  technologies: string[];

  @Prop()
  demoUrl: string;

  @Prop()
  sourceUrl: string;

  @Prop({ default: false })
  isPublished: boolean;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);

// Export the document type
export type ThemeDocument = Theme & Document;

// Indexes
ThemeSchema.index({ tenantId: 1 });
ThemeSchema.index({ tags: 1 });
ThemeSchema.index({ isPublished: 1 }); 