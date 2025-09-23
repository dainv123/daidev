import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiResponse({ status: 200, description: 'Tags retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const tags = await this.tagsService.findAll(tenantId);
    return {
      success: true,
      data: tags,
      pagination: {
        page: 1,
        limit: tags.length,
        total: tags.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tag by ID' })
  @ApiResponse({ status: 200, description: 'Tag retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const tag = await this.tagsService.findById(id, tenantId);
    if (!tag) {
      return { success: false, data: null, message: 'Tag not found' };
    }
    return { success: true, data: tag };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new tag (Admin only)' })
  @ApiResponse({ status: 201, description: 'Tag created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTagDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const tag = await this.tagsService.create(createTagDto, req.user.tenantId);
    return { success: true, data: tag, message: 'Tag created successfully' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update tag (Admin only)' })
  @ApiResponse({ status: 200, description: 'Tag updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTagDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    const updated = await this.tagsService.update(id, updateTagDto, req.user.tenantId);
    return { success: true, data: updated, message: 'Tag updated successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete tag (Admin only)' })
  @ApiResponse({ status: 204, description: 'Tag deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    await this.tagsService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Tag deleted successfully' };
  }
} 