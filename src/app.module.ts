import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { SummariesModule } from './models/summaries/summaries.module';

const DB_URI_DEV = 'mongodb://localhost/summarizer-dev';
const DB_URI_TEST = 'mongodb://localhost/summarizer-test';
const DB_URI_PROD = 'mongodb://localhost/summarizer-prod';

const DB_URI =
  process.env.NODE_ENV === 'test'
    ? DB_URI_TEST
    : process.env.NODE_ENV === 'production'
    ? DB_URI_PROD
    : DB_URI_DEV;

@Module({
  imports: [HttpModule, MongooseModule.forRoot(DB_URI), SummariesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
