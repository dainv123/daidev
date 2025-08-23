import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  async findAll() {
    const data = await this.educationService.findAll();
    return { success: true, data, message: 'Education records retrieved successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.educationService.findOne(id);
    return { success: true, data, message: 'Education record retrieved successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const created = await this.educationService.create(data);
    return { success: true, data: created, message: 'Education created successfully' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any) {
    const updated = await this.educationService.update(id, data);
    return { success: true, data: updated, message: 'Education updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.educationService.delete(id);
    return { success: true, message: 'Education deleted successfully' };
  }
}