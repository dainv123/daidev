import { Test, TestingModule } from '@nestjs/testing';
import { TenantMiddleware } from './tenant.middleware';
import { Request, Response } from 'express';

describe('TenantMiddleware', () => {
  let middleware: TenantMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantMiddleware],
    }).compile();

    middleware = module.get<TenantMiddleware>(TenantMiddleware);
    
    mockRequest = {
      headers: {},
      user: {},
    };
    mockResponse = {};
    mockNext = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should set tenantId from JWT user when available', () => {
      mockRequest.user = { tenantId: 'tenant-123' };

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user.tenantId).toBe('tenant-123');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should set tenantId from header when user not available', () => {
      mockRequest.user = undefined;
      mockRequest.headers['x-tenant-id'] = 'header-tenant-456';

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user.tenantId).toBe('header-tenant-456');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should set default tenantId when neither user nor header available', () => {
      mockRequest.user = undefined;
      mockRequest.headers = {};

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user.tenantId).toBe('default');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should preserve existing user properties when setting tenantId', () => {
      mockRequest.user = {
        id: 'user-123',
        email: 'test@example.com',
        role: 'admin',
      };
      mockRequest.headers['x-tenant-id'] = 'new-tenant';

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        role: 'admin',
        tenantId: 'new-tenant',
      });
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle empty header values gracefully', () => {
      mockRequest.user = undefined;
      mockRequest.headers['x-tenant-id'] = '';

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user.tenantId).toBe('default');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle null header values gracefully', () => {
      mockRequest.user = undefined;
      mockRequest.headers['x-tenant-id'] = null;

      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockRequest.user.tenantId).toBe('default');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should call next function after processing', () => {
      middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
}); 