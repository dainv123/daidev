import { Controller, Get, Post, Delete, Param, UseGuards, Request, HttpCode, HttpStatus, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ImagesService } from './images.service';
import { Types, isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({ status: 200, description: 'Images retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const images = await this.imagesService.findAll(tenantId);
    return {
      success: true,
      data: images,
      pagination: {
        page: 1,
        limit: images.length,
        total: images.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({ status: 200, description: 'Image retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid image id');
    }
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const image = await this.imagesService.findById(id, tenantId);
    if (!image) {
      return { success: false, data: null, message: 'Image not found' };
    }
    return { success: true, data: image };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }))
  @ApiOperation({ summary: 'Upload image file to S3 (no DB)' })
  @ApiResponse({ status: 201, description: 'Image uploaded to S3' })
  @ApiConsumes('multipart/form-data')
  async uploadFile(@UploadedFile() file: any, @Request() req: any) {
    if (!file) {
      return { success: false, message: 'No file uploaded', data: null };
    }
    const tenantId = req.user?.tenantId || 'default';
    const url = await this.imagesService.uploadFileToS3(file, tenantId);
    return { success: true, data: { url, filename: file.originalname, mimetype: file.mimetype, size: file.size }, message: 'Image uploaded to S3' };
  }

  @Post('presign-upload')
  @ApiOperation({ summary: 'Get S3 pre-signed upload URL' })
  @ApiResponse({ status: 201, description: 'Pre-signed URL generated' })
  async getPresignUploadUrl(@Body() body: { filename: string; mimetype: string }, @Request() req: any) {
    const { filename, mimetype } = body;
    const result = await this.imagesService.getPresignedUploadUrl(filename, mimetype);
    return { success: true, data: result };
  }

  @Post()
  @ApiOperation({ summary: 'Create image metadata in DB (no file upload)' })
  @ApiResponse({ status: 201, description: 'Image metadata saved' })
  async createMeta(@Body() body: any, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const image = await this.imagesService.saveS3ImageMeta({ ...body, tenantId });
    return { success: true, data: image, message: 'Image metadata saved' };
  }

  @Get(':id/signed-url')
  @ApiOperation({ summary: 'Get S3 pre-signed download URL for image' })
  @ApiResponse({ status: 200, description: 'Pre-signed download URL generated' })
  async getSignedUrl(@Param('id') id: string, @Request() req: any) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid image id');
    }
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const image = await this.imagesService.findById(id, tenantId);
    if (!image) {
      return { success: false, data: null, message: 'Image not found' };
    }
    const url = await this.imagesService.getPresignedDownloadUrl(image.url.split('.amazonaws.com/')[1]);
    return { success: true, data: { url } };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete image (Admin only)' })
  @ApiResponse({ status: 204, description: 'Image deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid image id');
    }
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    await this.imagesService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Image deleted successfully' };
  }
} 