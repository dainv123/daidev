import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'education' })
export class Education extends Document {
  @Prop({ required: true, type: Object })
  school: { en: string; vi: string };

  @Prop({ required: true, type: Object })
  degree: { en: string; vi: string };

  @Prop({ type: Object })
  field: { en: string; vi: string };

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: Object })
  description: { en: string; vi: string };

  @Prop({ default: true })
  isActive: boolean;
}

export const EducationSchema = SchemaFactory.createForClass(Education);