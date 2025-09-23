import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SiteSettingsService } from './site-settings.service';

@ApiTags('Site Settings')
@Controller('site-settings')
export class SiteSettingsController {
  constructor(private siteSettingsService: SiteSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all site settings' })
  @ApiResponse({ status: 200, description: 'Site settings retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const settings = await this.siteSettingsService.findAll(tenantId);
    return {
      success: true,
      data: settings,
      pagination: {
        page: 1,
        limit: settings.length,
        total: settings.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site setting by ID' })
  @ApiResponse({ status: 200, description: 'Site setting retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const setting = await this.siteSettingsService.findById(id, tenantId);
    if (!setting) {
      return { success: false, data: null, message: 'Site setting not found' };
    }
    return { success: true, data: setting };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new site setting (Admin only)' })
  @ApiResponse({ status: 201, description: 'Site setting created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSiteSettingsDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const setting = await this.siteSettingsService.create(createSiteSettingsDto, req.user.tenantId);
    return { success: true, data: setting, message: 'Site setting created successfully' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update site setting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Site setting updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateSiteSettingsDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const updated = await this.siteSettingsService.update(id, updateSiteSettingsDto, req.user.tenantId);
    return { success: true, data: updated, message: 'Site setting updated successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete site setting (Admin only)' })
  @ApiResponse({ status: 204, description: 'Site setting deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    await this.siteSettingsService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Site setting deleted successfully' };
  }
} 