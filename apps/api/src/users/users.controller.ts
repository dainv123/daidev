import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const users = await this.usersService.findAll(req.user.tenantId);
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      pagination: {
        page: 1,
        limit: users.length,
        total: users.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return { success: false, data: null, message: 'User not found' };
    }
    
    if (user.tenantId !== req.user.tenantId) {
      return { success: false, data: null, message: 'Access denied' };
    }
    
    return { success: true, data: user, message: 'User retrieved successfully' };
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBearerAuth()
  async create(@Body() createUserDto: any, @Request() req: any) {
    const user = await this.usersService.create({ ...createUserDto, tenantId: req.user.tenantId });
    return { success: true, data: user, message: 'User created successfully' };
  }

  @Put(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: any, @Request() req: any) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return { success: false, data: null, message: 'User not found' };
    }
    
    if (user.tenantId !== req.user.tenantId) {
      return { success: false, data: null, message: 'Access denied' };
    }
    
    const updated = await this.usersService.update(id, updateUserDto);
    return { success: true, data: updated, message: 'User updated successfully' };
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Request() req: any) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return { success: false, data: null, message: 'User not found' };
    }
    
    if (user.tenantId !== req.user.tenantId) {
      return { success: false, data: null, message: 'Access denied' };
    }
    
    await this.usersService.delete(id);
    return { success: true, data: null, message: 'User deleted successfully' };
  }
} 