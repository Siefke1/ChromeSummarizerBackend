// summaries.controller.ts
import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { Summary } from '../schemas/summary.schema';
import { Types } from 'mongoose';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Get()
  async findAll(): Promise<Summary[]> {
    return await this.summariesService.findAll();
  }

  @Post()
  async create(@Body() summary: Summary): Promise<Summary> {
    summary._id = new Types.ObjectId().toHexString();
    return await this.summariesService.create(summary);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Summary> {
    return await this.summariesService.delete(id);
  }
}
