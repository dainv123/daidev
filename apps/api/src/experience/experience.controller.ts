import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async findAll() {
    const data = await this.experienceService.findAll();
    return { success: true, data, message: 'Experience records retrieved successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.experienceService.findOne(id);
    return { success: true, data, message: 'Experience record retrieved successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const created = await this.experienceService.create(data);
    return { success: true, data: created, message: 'Experience created successfully' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any) {
    const updated = await this.experienceService.update(id, data);
    return { success: true, data: updated, message: 'Experience updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.experienceService.delete(id);
    return { success: true, message: 'Experience deleted successfully' };
  }
}