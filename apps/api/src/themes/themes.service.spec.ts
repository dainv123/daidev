import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ThemesService } from './themes.service';
import { Theme, ThemeDocument } from './themes.schema';

describe('ThemesService', () => {
  let service: ThemesService;
  let mockThemeModel: any;

  const mockTheme = {
    _id: 'theme-id',
    name: { en: 'Modern Portfolio', vi: 'Portfolio Hiện Đại' },
    description: { en: 'A modern portfolio theme', vi: 'Một theme portfolio hiện đại' },
    // category: 'portfolio',
    tags: ['modern', 'responsive', 'portfolio'],
    previewImage: 'preview.jpg',
    demoUrl: 'https://demo.example.com',
    price: 29.99,
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    isActive: true,
    tenantId: 'tenant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockThemeModel = {
    new: jest.fn().mockResolvedValue(mockTheme),
    constructor: jest.fn().mockResolvedValue(mockTheme),
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
        ThemesService,
        {
          provide: getModelToken(Theme.name),
          useValue: mockThemeModel,
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new theme', async () => {
      const createThemeDto = {
        name: { en: 'New Theme', vi: 'Theme Mới' },
        description: { en: 'A new theme', vi: 'Một theme mới' },
        // category: 'portfolio',
        tags: ['new', 'modern'],
        previewImage: 'new-preview.jpg',
        demoUrl: 'https://new-demo.example.com',
        price: 19.99,
        features: ['Feature 1', 'Feature 2'],
      };

      mockThemeModel.create.mockResolvedValue(mockTheme);

      const result = await service.create(createThemeDto, 'tenant-1');
      expect(result).toEqual(mockTheme);
    });
  });

  describe('findAll', () => {
    it('should return all themes for a tenant', async () => {
      const mockThemes = [mockTheme];
      mockThemeModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockThemes),
      });

      const result = await service.findAll('tenant-1');
      expect(result).toEqual(mockThemes);
    });
  });

  describe('findById', () => {
    it('should return theme by id', async () => {
      mockThemeModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      const result = await service.findById('theme-id', 'tenant-1');
      expect(result).toEqual(mockTheme);
    });
  });

  describe('findByCategory', () => {
    it('should return themes by category', async () => {
      const mockThemes = [mockTheme];
      mockThemeModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockThemes),
      });

      const result = await service.findByCategory('portfolio', 'tenant-1');
      expect(result).toEqual(mockThemes);
    });
  });

  describe('search', () => {
    it('should search themes by query', async () => {
      const mockThemes = [mockTheme];
      mockThemeModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockThemes),
      });

      const result = await service.search('modern', 'tenant-1');
      expect(result).toEqual(mockThemes);
    });
  });

  describe('update', () => {
    it('should update theme', async () => {
      const updateThemeDto = {
        name: { en: 'Updated Theme', vi: 'Theme Đã Cập Nhật' },
        price: 39.99,
      };

      const updatedTheme = { ...mockTheme, ...updateThemeDto };
      mockThemeModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedTheme),
      });

      const result = await service.update('theme-id', updateThemeDto, 'tenant-1');
      expect(result).toEqual(updatedTheme);
    });
  });

  describe('delete', () => {
    it('should delete theme', async () => {
      mockThemeModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTheme),
      });

      await expect(service.delete('theme-id', 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('getStats', () => {
    it('should return theme statistics', async () => {
      const mockStats = {
        total: 10,
        active: 8,
        categories: ['portfolio', 'blog', 'ecommerce'],
        totalRevenue: 299.90,
      };

      mockThemeModel.aggregate.mockResolvedValue([mockStats]);

      const result = await service.getStats('tenant-1');
      expect(result).toEqual(mockStats);
    });
  });
}); 