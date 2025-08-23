import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ContactMessageStatus {
  NEW = 'new',
  REPLIED = 'replied',
  ERROR = 'error',
}

export enum MailStatus {
  PENDING = 'pending',
  SENT = 'sent',
  ERROR = 'error',
}

@Schema({ timestamps: true })
export class ContactMessage extends Document {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: false })
  isReplied: boolean;

  @Prop({
    type: String,
    enum: ContactMessageStatus,
    default: ContactMessageStatus.NEW,
  })
  status: ContactMessageStatus;

  @Prop()
  errorMessage?: string;

  @Prop({ type: Date })
  readAt?: Date;

  @Prop({ type: Date })
  repliedAt?: Date;

  @Prop({ type: Object })
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
  };

  @Prop({ type: [{
    content: { type: String, required: true },
    repliedAt: { type: Date, required: true },
    adminEmail: { type: String },
    userMailStatus: { type: String, enum: MailStatus, default: MailStatus.PENDING },
    userMailError: { type: String },
    adminMailStatus: { type: String, enum: MailStatus, default: MailStatus.PENDING },
    adminMailError: { type: String },
  }], default: [] })
  replyLog: Array<{
    content: string;
    repliedAt: Date;
    adminEmail?: string;
    userMailStatus: MailStatus;
    userMailError?: string;
    adminMailStatus: MailStatus;
    adminMailError?: string;
  }>;
}

export type ContactMessageDocument = ContactMessage & Document;
export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage); 