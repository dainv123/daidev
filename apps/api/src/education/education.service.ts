import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from './education.schema';

@Injectable()
export class EducationService {
  constructor(@InjectModel(Education.name) private educationModel: Model<Education>) {}

  async findAll() {
    return this.educationModel.find();
  }

  async findOne(id: string) {
    return this.educationModel.findById(id);
  }

  async create(data: Partial<Education>) {
    return this.educationModel.create(data);
  }

  async update(id: string, data: Partial<Education>) {
    return this.educationModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.educationModel.findByIdAndDelete(id);
  }
}