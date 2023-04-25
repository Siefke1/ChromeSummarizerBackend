import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summary } from '../schemas/summary.schema';

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel('Summary') private readonly summaryModel: Model<Summary>,
  ) {}

  async findAll(): Promise<Summary[]> {
    return await this.summaryModel.find().sort({ createdAt: -1 }).exec();
  }

  async create(summary: Summary): Promise<Summary> {
    return this.summaryModel.create(summary);
  }

  async delete(id: string): Promise<Summary> {
    return await this.summaryModel.findByIdAndRemove(id);
  }
}
