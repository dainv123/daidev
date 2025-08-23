import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ThemesService } from './themes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Themes')
@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all themes' })
  @ApiResponse({ status: 200, description: 'Themes retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Query() query: any, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const themes = await this.themesService.findAll(tenantId);
    return {
      success: true,
      message: 'Themes retrieved successfully',
      data: themes,
      pagination: {
        page: 1,
        limit: themes.length,
        total: themes.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get theme by ID' })
  @ApiResponse({ status: 200, description: 'Theme retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const theme = await this.themesService.findById(id, tenantId);
    if (!theme) {
      return {
        success: false,
        message: 'Theme not found',
        data: null
      };
    }
    return {
      success: true,
      message: 'Theme retrieved successfully',
      data: theme
    };
  }



  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new theme' })
  @ApiResponse({ status: 201, description: 'Theme created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createThemeDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const theme = await this.themesService.create(createThemeDto, req.user.tenantId);
    return { success: true, data: theme, message: 'Theme created successfully' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update theme' })
  @ApiResponse({ status: 200, description: 'Theme updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateThemeDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const updated = await this.themesService.update(id, updateThemeDto, req.user.tenantId);
    return { success: true, data: updated, message: 'Theme updated successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete theme' })
  @ApiResponse({ status: 204, description: 'Theme deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    await this.themesService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Theme deleted successfully' };
  }

  @Put(':id/toggle-publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle theme publish status' })
  @ApiResponse({ status: 200, description: 'Theme publish status toggled' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async togglePublish(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const result = await this.themesService.togglePublish(id, req.user.tenantId);
    return { success: true, data: result, message: 'Theme publish status toggled' };
  }
} 