import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Theme, ThemeDocument } from './themes.schema';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
  ) {}

  async create(createThemeDto: any, tenantId: string): Promise<Theme> {
    const theme = new this.themeModel({
      ...createThemeDto,
      tenantId,
    });
    return theme.save();
  }

  async findAll(tenantId: string): Promise<Theme[]> {
    return this.themeModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<Theme | null> {
    return this.themeModel.findOne({ _id: id, tenantId }).exec();
  }

  async update(id: string, updateThemeDto: any, tenantId: string): Promise<Theme> {
    const theme = await this.themeModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateThemeDto,
      { new: true }
    ).exec();
    
    if (!theme) {
      throw new NotFoundException('Theme not found');
    }
    
    return theme;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.themeModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Theme not found');
    }
  }

  async togglePublish(id: string, tenantId: string): Promise<Theme> {
    const theme = await this.themeModel.findOne({ _id: id, tenantId }).exec();
    if (!theme) {
      throw new NotFoundException('Theme not found');
    }
    
    theme.isPublished = !theme.isPublished;
    return theme.save();
  }
} 