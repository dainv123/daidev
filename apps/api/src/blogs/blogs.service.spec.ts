import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BlogsService } from './blogs.service';
import { Blog, BlogDocument } from './blogs.schema';

describe('BlogsService', () => {
  let service: BlogsService;
  let mockBlogModel: any;

  const mockBlog = {
    _id: 'blog-id',
    title: { en: 'Getting Started with NestJS', vi: 'Bắt đầu với NestJS' },
    content: { en: 'NestJS is a powerful framework...', vi: 'NestJS là một framework mạnh mẽ...' },
    excerpt: { en: 'Learn how to build scalable applications...', vi: 'Học cách xây dựng ứng dụng có thể mở rộng...' },
    slug: 'getting-started-with-nestjs',
    author: 'author-id',
    tags: ['nestjs', 'typescript', 'backend'],
    category: 'tutorial',
    featuredImage: 'featured.jpg',
    isPublished: true,
    isFeatured: false,
    readTime: 5,
    views: 100,
    likes: 25,
    tenantId: 'tenant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
  };

  const mockBlogModel = {
    new: jest.fn().mockResolvedValue(mockBlog),
    constructor: jest.fn().mockResolvedValue(mockBlog),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
    aggregate: jest.fn(),
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: getModelToken(Blog.name),
          useValue: mockBlogModel,
        },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new blog post', async () => {
      const createBlogDto = {
        title: { en: 'New Blog Post', vi: 'Bài viết mới' },
        content: { en: 'Content here', vi: 'Nội dung ở đây' },
        excerpt: { en: 'Excerpt here', vi: 'Tóm tắt ở đây' },
        slug: 'new-blog-post',
        author: 'author-id',
        tags: ['new', 'blog'],
        category: 'general',
        featuredImage: 'new-image.jpg',
        readTime: 3,
      };

      mockBlogModel.create.mockResolvedValue(mockBlog);

      const result = await service.create(createBlogDto, 'tenant-1');
      expect(result).toEqual(mockBlog);
    });
  });

  describe('findAll', () => {
    it('should return all published blogs for a tenant', async () => {
      const mockBlogs = [mockBlog];
      mockBlogModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockBlogs),
        }),
      });

      const result = await service.findAll('tenant-1');
      expect(result).toEqual(mockBlogs);
    });
  });

  describe('findById', () => {
    it('should return blog by id', async () => {
      mockBlogModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBlog),
      });

      const result = await service.findById('blog-id', 'tenant-1');
      expect(result).toEqual(mockBlog);
    });
  });

  describe('findBySlug', () => {
    it('should return blog by slug', async () => {
      mockBlogModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBlog),
      });

      const result = await service.findBySlug('getting-started-with-nestjs', 'tenant-1');
      expect(result).toEqual(mockBlog);
    });
  });

  describe('findByCategory', () => {
    it('should return blogs by category', async () => {
      const mockBlogs = [mockBlog];
      mockBlogModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockBlogs),
        }),
      });

      const result = await service.findByCategory('tutorial', 'tenant-1');
      expect(result).toEqual(mockBlogs);
    });
  });

  describe('search', () => {
    it('should search blogs by query', async () => {
      const mockBlogs = [mockBlog];
      mockBlogModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockBlogs),
        }),
      });

      const result = await service.search('nestjs', 'tenant-1');
      expect(result).toEqual(mockBlogs);
    });
  });

  describe('update', () => {
    it('should update blog', async () => {
      const updateBlogDto = {
        title: { en: 'Updated Title', vi: 'Tiêu đề đã cập nhật' },
        isPublished: false,
      };

      const updatedBlog = { ...mockBlog, ...updateBlogDto };
      mockBlogModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedBlog),
      });

      const result = await service.update('blog-id', updateBlogDto, 'tenant-1');
      expect(result).toEqual(updatedBlog);
    });
  });

  describe('delete', () => {
    it('should delete blog', async () => {
      mockBlogModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBlog),
      });

      await expect(service.delete('blog-id', 'tenant-1')).resolves.not.toThrow();
    });
  });

  describe('publish', () => {
    it('should publish blog', async () => {
      const publishedBlog = { ...mockBlog, isPublished: true, publishedAt: new Date() };
      mockBlogModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(publishedBlog),
      });

      const result = await service.publish('blog-id', 'tenant-1');
      expect(result.isPublished).toBe(true);
      expect(result.publishedAt).toBeDefined();
    });
  });

  describe('unpublish', () => {
    it('should unpublish blog', async () => {
      const unpublishedBlog = { ...mockBlog, isPublished: false, publishedAt: null };
      mockBlogModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(unpublishedBlog),
      });

      const result = await service.unpublish('blog-id', 'tenant-1');
      expect(result.isPublished).toBe(false);
      expect(result.publishedAt).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return blog statistics', async () => {
      const mockStats = {
        total: 50,
        published: 45,
        drafts: 5,
        categories: ['tutorial', 'news', 'guide'],
        totalViews: 5000,
        totalLikes: 250,
      };

      mockBlogModel.aggregate.mockResolvedValue([mockStats]);

      const result = await service.getStats('tenant-1');
      expect(result).toEqual(mockStats);
    });
  });
}); 