import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

const PROMPT_PREFIX = `Please give me a summary of the following text: \n`;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('summarize')
  async sendSelectedText(@Body('prompt') prompt: string, @Res() res: Response) {
    try {
      const response = await this.appService.sendSelectedText(
        PROMPT_PREFIX + prompt,
        process.env.OPEN_AI_API_KEY,
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
}
