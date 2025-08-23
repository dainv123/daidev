import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Skill extends Document {
  @Prop({ required: true, type: Object })
  name: { en: string; vi: string };

  @Prop({ required: true, type: Object })
  level: { en: string; vi: string };

  @Prop()
  icon: string;

  @Prop({ default: 0 })
  stars: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);