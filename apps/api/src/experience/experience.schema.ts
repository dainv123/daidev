import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'experience' })
export class Experience extends Document {
  @Prop({ required: true, type: Object })
  company: { en: string; vi: string };

  @Prop({ required: true, type: Object })
  position: { en: string; vi: string };

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: Object })
  description: { en: string; vi: string };

  @Prop({ default: true })
  isActive: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);