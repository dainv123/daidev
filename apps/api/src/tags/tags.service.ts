import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './tags.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  async create(createTagDto: any, tenantId: string): Promise<Tag> {
    const tag = new this.tagModel({
      ...createTagDto,
      tenantId,
    });
    return tag.save();
  }

  async findAll(tenantId: string): Promise<Tag[]> {
    return this.tagModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<Tag | null> {
    return this.tagModel.findOne({ _id: id, tenantId }).exec();
  }

  async update(id: string, updateTagDto: any, tenantId: string): Promise<Tag> {
    const tag = await this.tagModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateTagDto,
      { new: true }
    ).exec();
    
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    
    return tag;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.tagModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Tag not found');
    }
  }
} 