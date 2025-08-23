import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './experience.schema';

@Injectable()
export class ExperienceService {
  constructor(@InjectModel(Experience.name) private experienceModel: Model<Experience>) {}

  async findAll() {
    return this.experienceModel.find();
  }

  async findOne(id: string) {
    return this.experienceModel.findById(id);
  }

  async create(data: Partial<Experience>) {
    return this.experienceModel.create(data);
  }

  async update(id: string, data: Partial<Experience>) {
    return this.experienceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.experienceModel.findByIdAndDelete(id);
  }
}