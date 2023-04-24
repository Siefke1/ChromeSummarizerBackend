import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarySchema } from '../schemas/summary.schema';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import { Summary } from '../schemas/summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
})
export class SummariesModule {}
