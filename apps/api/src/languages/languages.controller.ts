import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  async findAll() {
    const data = await this.languagesService.findAll();
    return { success: true, data, message: 'Languages retrieved successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.languagesService.findOne(id);
    return { success: true, data, message: 'Language retrieved successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const created = await this.languagesService.create(data);
    return { success: true, data: created, message: 'Language created successfully' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any) {
    const updated = await this.languagesService.update(id, data);
    return { success: true, data: updated, message: 'Language updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.languagesService.delete(id);
    return { success: true, message: 'Language deleted successfully' };
  }
}