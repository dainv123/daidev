import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './skills.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findAll() {
    return this.skillModel.find();
  }

  async findOne(id: string) {
    return this.skillModel.findById(id);
  }

  async create(data: Partial<Skill>) {
    return this.skillModel.create(data);
  }

  async update(id: string, data: Partial<Skill>) {
    return this.skillModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.skillModel.findByIdAndDelete(id);
  }
}