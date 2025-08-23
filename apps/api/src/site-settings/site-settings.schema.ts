import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SiteSettingsDocument = SiteSettings & Document;

@Schema({ timestamps: true })
export class SiteSettings {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ required: true, index: true })
  key: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  value: any;

  // Legacy fields for backward compatibility
  @Prop({
    type: {
      title: {
        en: { type: String, required: false },
        vi: { type: String, required: false }
      },
      subtitle: {
        en: { type: String, required: false },
        vi: { type: String, required: false }
      }
    },
    required: false
  })
  header?: {
    title: {
      en: string;
      vi: string;
    };
    subtitle: {
      en: string;
      vi: string;
    };
  };

  @Prop({
    type: [{
      label: {
        en: { type: String, required: false },
        vi: { type: String, required: false }
      },
      url: { type: String, required: false },
      order: { type: Number, required: false }
    }],
    default: []
  })
  menu?: Array<{
    label: {
      en: string;
      vi: string;
    };
    url: string;
    order: number;
  }>;

  @Prop({
    type: {
      text: {
        en: { type: String, required: false },
        vi: { type: String, required: false }
      },
      links: [{
        label: {
          en: { type: String, required: false },
          vi: { type: String, required: false }
        },
        url: { type: String, required: false }
      }]
    },
    required: false
  })
  footer?: {
    text: {
      en: string;
      vi: string;
    };
    links: Array<{
      label: {
        en: string;
        vi: string;
      };
      url: string;
    }>;
  };
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);

// Indexes
SiteSettingsSchema.index({ tenantId: 1, key: 1 }, { unique: true });
SiteSettingsSchema.index({ tenantId: 1 }); 