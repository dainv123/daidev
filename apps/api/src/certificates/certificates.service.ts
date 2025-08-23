import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Certificate, CertificateDocument } from './certificates.schema';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name) private certificateModel: Model<CertificateDocument>,
  ) {}

  async create(createCertificateDto: any, tenantId: string): Promise<Certificate> {
    const certificate = new this.certificateModel({
      ...createCertificateDto,
      tenantId,
    });
    return certificate.save();
  }

  async findAll(tenantId: string): Promise<Certificate[]> {
    return this.certificateModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<Certificate | null> {
    return this.certificateModel.findOne({ _id: id, tenantId }).exec();
  }

  async update(id: string, updateCertificateDto: any, tenantId: string): Promise<Certificate> {
    const certificate = await this.certificateModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateCertificateDto,
      { new: true }
    ).exec();
    
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    
    return certificate;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.certificateModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Certificate not found');
    }
  }

  async togglePublish(id: string, tenantId: string): Promise<Certificate> {
    const certificate = await this.certificateModel.findOne({ _id: id, tenantId }).exec();
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    
    certificate.isPublished = !certificate.isPublished;
    return certificate.save();
  }
} 