import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    const data = await this.skillsService.findAll();
    return { success: true, data, message: 'Skills retrieved successfully' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.skillsService.findOne(id);
    return { success: true, data, message: 'Skill retrieved successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: any) {
    const created = await this.skillsService.create(data);
    return { success: true, data: created, message: 'Skill created successfully' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any) {
    const updated = await this.skillsService.update(id, data);
    return { success: true, data: updated, message: 'Skill updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.skillsService.delete(id);
    return { success: true, message: 'Skill deleted successfully' };
  }
}