import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blogs.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async create(createBlogDto: any, tenantId: string): Promise<Blog> {
    const blog = new this.blogModel({
      ...createBlogDto,
      tenantId,
    });
    return blog.save();
  }

  async findAll(tenantId: string): Promise<Blog[]> {
    return this.blogModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<Blog | null> {
    return this.blogModel.findOne({ _id: id, tenantId }).exec();
  }

  async findBySlug(slug: string, tenantId: string): Promise<Blog | null> {
    return this.blogModel.findOne({ slug, tenantId }).exec();
  }

  async update(id: string, updateBlogDto: any, tenantId: string): Promise<Blog> {
    const blog = await this.blogModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateBlogDto,
      { new: true }
    ).exec();
    
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    
    return blog;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.blogModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Blog not found');
    }
  }

  async togglePublish(id: string, tenantId: string): Promise<Blog> {
    const blog = await this.blogModel.findOne({ _id: id, tenantId }).exec();
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    
    blog.isPublished = !blog.isPublished;
    return blog.save();
  }
} 