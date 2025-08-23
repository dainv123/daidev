import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Certificate extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  name: { en: string; vi: string };

  @Prop({
    type: {
      en: { type: String, required: true },
      vi: { type: String, required: true },
    },
  })
  issuer: { en: string; vi: string };

  @Prop({ required: true })
  issueDate: Date;

  @Prop({ required: true })
  certificateUrl: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({
    type: {
      en: { type: String, required: false },
      vi: { type: String, required: false },
    },
    default: { en: '', vi: '' },
  })
  description: { en: string; vi: string };

  @Prop({ required: false })
  expiryDate: Date;

  @Prop({ required: false })
  credentialId: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);

// Export the document type
export type CertificateDocument = Certificate & Document;

// Indexes
CertificateSchema.index({ tenantId: 1 });
CertificateSchema.index({ isPublished: 1 });
CertificateSchema.index({ issueDate: 1 }); 