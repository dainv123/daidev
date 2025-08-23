import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSettings, SiteSettingsDocument } from './site-settings.schema';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectModel(SiteSettings.name) private siteSettingsModel: Model<SiteSettingsDocument>,
  ) {}

  async create(createSiteSettingsDto: any, tenantId: string): Promise<SiteSettings> {
    const siteSetting = new this.siteSettingsModel({
      ...createSiteSettingsDto,
      tenantId,
    });
    return siteSetting.save();
  }

  async findAll(tenantId: string): Promise<SiteSettings[]> {
    return this.siteSettingsModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<SiteSettings | null> {
    return this.siteSettingsModel.findOne({ _id: id, tenantId }).exec();
  }

  async update(id: string, updateSiteSettingsDto: any, tenantId: string): Promise<SiteSettings> {
    const siteSetting = await this.siteSettingsModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateSiteSettingsDto,
      { new: true }
    ).exec();
    
    if (!siteSetting) {
      throw new NotFoundException('Site setting not found');
    }
    
    return siteSetting;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.siteSettingsModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Site setting not found');
    }
  }
} 