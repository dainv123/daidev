import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'viewer'], default: 'viewer' })
  role: string;

  @Prop({
    type: {
      name: String,
      bio: { en: String, vi: String },
      avatar: String,
      socialLinks: { github: String, linkedin: String, twitter: String },
    },
  })
  profile: {
    name: string;
    bio: { en: string; vi: string };
    avatar: string;
    socialLinks: { github?: string; linkedin?: string; twitter?: string };
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

// Export the document type
export type UserDocument = User & Document;

// Indexes
UserSchema.index({ email: 1 }, { unique: true }); 