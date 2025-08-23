import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContactMessagesService } from './contact-messages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Contact Messages')
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private contactMessagesService: ContactMessagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all contact messages (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact messages retrieved successfully' })
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    const tenantId = req.user.tenantId;
    const messages = await this.contactMessagesService.findAll(tenantId);
    return {
      success: true,
      data: messages,
      pagination: {
        page: 1,
        limit: messages.length,
        total: messages.length,
        totalPages: 1
      }
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get contact message by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact message retrieved successfully' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    const message = await this.contactMessagesService.findById(id, tenantId);
    if (!message) {
      return { success: false, data: null, message: 'Contact message not found' };
    }
    return { success: true, data: message };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit contact form (Public)' })
  @ApiResponse({ status: 201, description: 'Contact message submitted successfully' })
  async create(@Body() createContactMessageDto: any, @Request() req: any) {
    const tenantId = req?.headers['x-tenant-id'] || 'default';
    const message = await this.contactMessagesService.create(createContactMessageDto, tenantId);
    return { success: true, data: message, message: 'Contact message submitted successfully' };
  }

  @Put(':id/mark-read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark message as read (Admin only)' })
  @ApiResponse({ status: 200, description: 'Message marked as read' })
  @ApiBearerAuth()
  async markAsRead(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    const result = await this.contactMessagesService.markAsRead(id, tenantId);
    return { success: true, data: result, message: 'Message marked as read' };
  }

  @Put(':id/mark-replied')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark message as replied (Admin only)' })
  @ApiResponse({ status: 200, description: 'Message marked as replied' })
  @ApiBearerAuth()
  async markAsReplied(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    const result = await this.contactMessagesService.markAsReplied(id, tenantId);
    return { success: true, data: result, message: 'Message marked as replied' };
  }

  @Put(':id/reply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reply to contact message and send email (Admin only)' })
  @ApiResponse({ status: 200, description: 'Reply sent and email delivered' })
  @ApiBearerAuth()
  async reply(@Param('id') id: string, @Body() body: { replyContent: string }, @Request() req: any) {
    const tenantId = req.user.tenantId;
    const adminEmail = req.user?.email;
    const result = await this.contactMessagesService.reply(id, body.replyContent, tenantId, adminEmail);
    return { success: true, data: result, message: 'Reply sent and email delivered' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update contact message (Admin only)' })
  @ApiResponse({ status: 200, description: 'Contact message updated successfully' })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateContactMessageDto: any, @Request() req: any) {
    const tenantId = req.user.tenantId;
    const updated = await this.contactMessagesService.update(id, updateContactMessageDto, tenantId);
    return { success: true, data: updated, message: 'Contact message updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete contact message (Admin only)' })
  @ApiResponse({ status: 204, description: 'Contact message deleted successfully' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Request() req: any) {
    const tenantId = req.user.tenantId;
    await this.contactMessagesService.delete(id, tenantId);
    return { success: true, data: null, message: 'Contact message deleted successfully' };
  }
} 