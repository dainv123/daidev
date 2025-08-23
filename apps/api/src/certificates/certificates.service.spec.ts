import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CertificatesService } from './certificates.service';
import { Certificate, CertificateDocument } from './certificates.schema';

describe('CertificatesService', () => {
  let service: CertificatesService;
  let mockCertificateModel: any;

  const mockCertificate = {
    _id: 'certificate-id',
    name: { en: 'AWS Solutions Architect', vi: 'Kiến trúc sư giải pháp AWS' },
    issuer: { en: 'Amazon Web Services', vi: 'Amazon Web Services' },
    description: { en: 'Professional level certification', vi: 'Chứng chỉ cấp độ chuyên nghiệp' },
    image: 'aws-cert.jpg',
    issueDate: new Date('2023-01-15'),
    expiryDate: new Date('2026-01-15'),
    credentialId: 'AWS-123456',
    credentialUrl: 'https://aws.amazon.com/verification',
    isActive: true,
    tenantId: 'tenant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCertificateModel = {
    new: jest.fn().mockResolvedValue(mockCertificate),
    constructor: jest.fn().mockResolvedValue(mockCertificate),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
    aggregate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificatesService,
        {
          provide: getModelToken(Certificate.name),
          useValue: mockCertificateModel,
        },
      ],
    }).compile();

    service = module.get<CertificatesService>(CertificatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new certificate', async () => {
      const createCertificateDto = {
        name: { en: 'New Certificate', vi: 'Chứng chỉ mới' },
        issuer: { en: 'New Issuer', vi: 'Tổ chức cấp mới' },
        description: { en: 'New description', vi: 'Mô tả mới' },
        image: 'new-cert.jpg',
        issueDate: new Date('2024-01-01'),
        expiryDate: new Date('2027-01-01'),
        credentialId: 'NEW-123',
        credentialUrl: 'https://new-issuer.com/verify',
      };

      mockCertificateModel.create.mockResolvedValue(mockCertificate);

      const result = await service.create(createCertificateDto, 'tenant-1');
      expect(result).toEqual(mockCertificate);
    });
  });

  describe('findAll', () => {
    it('should return all active certificates for a tenant', async () => {
      const mockCertificates = [mockCertificate];
      mockCertificateModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockCertificates),
        }),
      });

      const result = await service.findAll('tenant-1');
      expect(result).toEqual(mockCertificates);
    });
  });

  describe('findById', () => {
    it('should return certificate by id', async () => {
      mockCertificateModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCertificate),
      });

      const result = await service.findById('certificate-id', 'tenant-1');
      expect(result).toEqual(mockCertificate);
    });
  });

  describe('findByIssuer', () => {
    it('should return certificates by issuer', async () => {
      const mockCertificates = [mockCertificate];
      mockCertificateModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockCertificates),
        }),
      });

      const result = await service.findByIssuer('Amazon Web Services', 'tenant-1');
      expect(result).toEqual(mockCertificates);
    });
  });

  describe('findExpiringSoon', () => {
    it('should return certificates expiring soon', async () => {
      const mockCertificates = [mockCertificate];
      mockCertificateModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockCertificates),
        }),
      });

      const result = await service.findExpiringSoon('tenant-1', 30);
      expect(result).toEqual(mockCertificates);
    });
  });

  describe('update', () => {
    it('should update certificate', async () => {
      const updateCertificateDto = {
        name: { en: 'Updated Certificate', vi: 'Chứng chỉ đã cập nhật' },
        isActive: false,
      };

      const updatedCertificate = { ...mockCertificate, ...updateCertificateDto };
      mockCertificateModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedCertificate),
      });

      const result = await service.update('certificate-id', updateCertificateDto, 'tenant-1');
      expect(result).toEqual(updatedCertificate);
    });
  });

  describe('delete', () => {
    it('should delete certificate', async () => {
      mockCertificateModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCertificate),
      });

      await expect(service.delete('certificate-id', 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('getStats', () => {
    it('should return certificate statistics', async () => {
      const mockStats = {
        total: 15,
        active: 12,
        expired: 3,
        expiringSoon: 2,
        issuers: ['AWS', 'Microsoft', 'Google'],
        totalValue: 5000,
      };

      mockCertificateModel.aggregate.mockResolvedValue([mockStats]);

      const result = await service.getStats('tenant-1');
      expect(result).toEqual(mockStats);
    });
  });

  describe('validateCredential', () => {
    it('should validate credential URL', async () => {
      const mockCertificate = {
        ...mockCertificate,
        credentialUrl: 'https://aws.amazon.com/verification',
      };

      mockCertificateModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCertificate),
      });

      const result = await service.validateCredential('AWS-123456', 'tenant-1');
      expect(result).toBeDefined();
    });
  });
}); 