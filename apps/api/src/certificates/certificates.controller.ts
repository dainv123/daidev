import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, description: 'Certificates retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const certificates = await this.certificatesService.findAll(tenantId);
    return {
      success: true,
      message: 'Certificates retrieved successfully',
      data: certificates,
      pagination: {
        page: 1,
        limit: certificates.length,
        total: certificates.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate by ID' })
  @ApiResponse({ status: 200, description: 'Certificate retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const certificate = await this.certificatesService.findById(id, tenantId);
    if (!certificate) {
      return { success: false, data: null, message: 'Certificate not found' };
    }
    return { success: true, data: certificate, message: 'Certificate retrieved successfully' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new certificate (Admin only)' })
  @ApiResponse({ status: 201, description: 'Certificate created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCertificateDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const certificate = await this.certificatesService.create(createCertificateDto, req.user.tenantId);
    return { success: true, data: certificate, message: 'Certificate created successfully' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update certificate (Admin only)' })
  @ApiResponse({ status: 200, description: 'Certificate updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateCertificateDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const updated = await this.certificatesService.update(id, updateCertificateDto, req.user.tenantId);
    return { success: true, data: updated, message: 'Certificate updated successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete certificate (Admin only)' })
  @ApiResponse({ status: 204, description: 'Certificate deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    await this.certificatesService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Certificate deleted successfully' };
  }

  @Put(':id/toggle-publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle certificate publish status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Certificate publish status toggled' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async togglePublish(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const result = await this.certificatesService.togglePublish(id, req.user.tenantId);
    return { success: true, data: result, message: 'Certificate publish status toggled' };
  }
} 