import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language } from './languages.schema';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private languageModel: Model<Language>) {}

  async findAll() {
    return this.languageModel.find();
  }

  async findOne(id: string) {
    return this.languageModel.findById(id);
  }

  async create(data: Partial<Language>) {
    return this.languageModel.create(data);
  }

  async update(id: string, data: Partial<Language>) {
    return this.languageModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.languageModel.findByIdAndDelete(id);
  }
}