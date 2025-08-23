import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SiteSettingsService } from './site-settings.service';
import { SiteSetting, SiteSettingDocument } from './site-settings.schema';

describe('SiteSettingsService', () => {
  let service: SiteSettingsService;
  let mockSiteSettingModel: any;

  const mockSiteSetting = {
    _id: 'setting-id',
    key: 'site.name',
    value: { en: 'My Portfolio', vi: 'Portfolio của tôi' },
    description: { en: 'Site name', vi: 'Tên trang web' },
    type: 'object',
    isPublic: true,
    tenantId: 'tenant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSiteSettingModel = {
    new: jest.fn().mockResolvedValue(mockSiteSetting),
    constructor: jest.fn().mockResolvedValue(mockSiteSetting),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
    bulkWrite: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SiteSettingsService,
        {
          provide: getModelToken(SiteSetting.name),
          useValue: mockSiteSettingModel,
        },
      ],
    }).compile();

    service = module.get<SiteSettingsService>(SiteSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new site setting', async () => {
      const createSiteSettingDto = {
        key: 'site.description',
        value: { en: 'Professional portfolio', vi: 'Portfolio chuyên nghiệp' },
        description: { en: 'Site description', vi: 'Mô tả trang web' },
        type: 'object',
        isPublic: true,
      };

      mockSiteSettingModel.create.mockResolvedValue(mockSiteSetting);

      const result = await service.create(createSiteSettingDto, 'tenant-1');
      expect(result).toEqual(mockSiteSetting);
    });
  });

  describe('findAll', () => {
    it('should return all site settings for a tenant', async () => {
      const mockSettings = [mockSiteSetting];
      mockSiteSettingModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSettings),
      });

      const result = await service.findAll('tenant-1');
      expect(result).toEqual(mockSettings);
    });
  });

  describe('findById', () => {
    it('should return site setting by id', async () => {
      mockSiteSettingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSiteSetting),
      });

      const result = await service.findById('setting-id', 'tenant-1');
      expect(result).toEqual(mockSiteSetting);
    });
  });

  describe('findByKey', () => {
    it('should return site setting by key', async () => {
      mockSiteSettingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSiteSetting),
      });

      const result = await service.findByKey('site.name', 'tenant-1');
      expect(result).toEqual(mockSiteSetting);
    });
  });

  describe('update', () => {
    it('should update site setting', async () => {
      const updateSiteSettingDto = {
        value: { en: 'Updated Portfolio', vi: 'Portfolio đã cập nhật' },
        description: { en: 'Updated description', vi: 'Mô tả đã cập nhật' },
      };

      const updatedSetting = { ...mockSiteSetting, ...updateSiteSettingDto };
      mockSiteSettingModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedSetting),
      });

      const result = await service.update('setting-id', updateSiteSettingDto, 'tenant-1');
      expect(result).toEqual(updatedSetting);
    });
  });

  describe('updateByKey', () => {
    it('should update site setting by key', async () => {
      const updatedSetting = { ...mockSiteSetting, value: 'New Value' };
      mockSiteSettingModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedSetting),
      });

      const result = await service.updateByKey('site.name', 'New Value', 'tenant-1');
      expect(result).toEqual(updatedSetting);
    });
  });

  describe('delete', () => {
    it('should delete site setting', async () => {
      mockSiteSettingModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSiteSetting),
      });

      await expect(service.delete('setting-id', 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('deleteByKey', () => {
    it('should delete site setting by key', async () => {
      mockSiteSettingModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSiteSetting),
      });

      await expect(service.deleteByKey('site.name', 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('getValue', () => {
    it('should return setting value with caching', async () => {
      mockSiteSettingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSiteSetting),
      });

      const result = await service.getValue('site.name', 'tenant-1');
      expect(result).toEqual(mockSiteSetting.value);
    });

    it('should return default value when setting not found', async () => {
      mockSiteSettingModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.getValue('nonexistent.key', 'tenant-1', 'default');
      expect(result).toBe('default');
    });
  });

  describe('getMultipleValues', () => {
    it('should return multiple setting values', async () => {
      const mockSettings = [
        { key: 'site.name', value: 'My Portfolio' },
        { key: 'site.description', value: 'Professional portfolio' },
      ];

      mockSiteSettingModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSettings),
      });

      const result = await service.getMultipleValues(['site.name', 'site.description'], 'tenant-1');
      expect(result).toEqual({
        'site.name': 'My Portfolio',
        'site.description': 'Professional portfolio',
      });
    });
  });

  describe('getAllSettings', () => {
    it('should return all settings with caching', async () => {
      const mockSettings = [
        { key: 'site.name', value: 'My Portfolio' },
        { key: 'site.description', value: 'Professional portfolio' },
      ];

      mockSiteSettingModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSettings),
      });

      const result = await service.getAllSettings('tenant-1');
      expect(result).toEqual({
        'site.name': 'My Portfolio',
        'site.description': 'Professional portfolio',
      });
    });
  });

  describe('setMultipleValues', () => {
    it('should set multiple setting values', async () => {
      const settings = {
        'site.name': 'New Name',
        'site.description': 'New Description',
      };

      mockSiteSettingModel.bulkWrite.mockResolvedValue({ ok: 1 });

      await expect(service.setMultipleValues(settings, 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('resetToDefaults', () => {
    it('should reset settings to defaults', async () => {
      mockSiteSettingModel.bulkWrite.mockResolvedValue({ ok: 1 });

      await expect(service.resetToDefaults('tenant-1')).resolves.not.toThrow();
    });
  });

  describe('getPublicSettings', () => {
    it('should return only public settings', async () => {
      const mockSettings = [
        { key: 'site.name', value: 'My Portfolio' },
        { key: 'site.description', value: 'Professional portfolio' },
      ];

      mockSiteSettingModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSettings),
      });

      const result = await service.getPublicSettings('tenant-1');
      expect(result).toEqual({
        'site.name': 'My Portfolio',
        'site.description': 'Professional portfolio',
      });
    });
  });
}); 