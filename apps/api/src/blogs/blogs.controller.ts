import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({ status: 200, description: 'Blogs retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    
    const blogs = await this.blogsService.findAll(tenantId);

    return {
      success: true,
      message: 'Blogs retrieved successfully',
      data: blogs,
      pagination: {
        page: 1,
        limit: blogs.length,
        total: blogs.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog by ID' })
  @ApiResponse({ status: 200, description: 'Blog retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const blog = await this.blogsService.findById(id, tenantId);
    if (!blog) {
      return { success: false, data: null, message: 'Blog not found' };
    }
    return { success: true, data: blog, message: 'Blog retrieved successfully' };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get blog by slug' })
  @ApiResponse({ status: 200, description: 'Blog retrieved successfully' })
  async findBySlug(@Param('slug') slug: string, @Request() req: any) {
    const tenantId = req?.user?.tenantId || req?.headers['x-tenant-id'] || 'default';
    const blog = await this.blogsService.findBySlug(slug, tenantId);
    if (!blog) {
      return { success: false, data: null, message: 'Blog not found' };
    }
    return { success: true, data: blog, message: 'Blog retrieved successfully' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new blog (Admin only)' })
  @ApiResponse({ status: 201, description: 'Blog created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBlogDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    
    const blog = await this.blogsService.create(createBlogDto, req.user.tenantId);
    return { success: true, data: blog, message: 'Blog created successfully' };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update blog (Admin only)' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateBlogDto: any, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    
    const updated = await this.blogsService.update(id, updateBlogDto, req.user.tenantId);
    return { success: true, data: updated, message: 'Blog updated successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete blog (Admin only)' })
  @ApiResponse({ status: 204, description: 'Blog deleted successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    
    await this.blogsService.delete(id, req.user.tenantId);
    return { success: true, data: null, message: 'Blog deleted successfully' };
  }

  @Put(':id/toggle-publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle blog publish status (Admin only)' })
  @ApiResponse({ status: 200, description: 'Blog publish status toggled' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async togglePublish(@Param('id') id: string, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      return { success: false, data: null, message: 'Admin access required' };
    }
    
    const result = await this.blogsService.togglePublish(id, req.user.tenantId);
    return { success: true, data: result, message: 'Blog publish status toggled' };
  }
} 