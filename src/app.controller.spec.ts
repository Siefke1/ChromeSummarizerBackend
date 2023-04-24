import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';
import { CreateChatCompletionResponse } from 'openai';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const helloResult = 'Hello World!';
      jest.spyOn(appService, 'getHello').mockReturnValue(helloResult);
      expect(appController.getHello()).toBe(helloResult);
    });
  });

  describe('sendSelectedText', () => {
    it('should return a JSON response with the summary result', async () => {
      const prompt = 'This is a test prompt';
      const apiResponse = { summary: 'This is a test summary' };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest
        .spyOn(appService, 'sendSelectedText')
        .mockResolvedValue(
          apiResponse as unknown as Promise<CreateChatCompletionResponse>,
        );

      await appController.sendSelectedText(prompt, res);

      expect(appService.sendSelectedText).toHaveBeenCalledWith(
        `Please give me a summary of the following text: \n${prompt}`,
        process.env.OPEN_AI_API_KEY,
      );
      expect(res.json).toHaveBeenCalledWith(apiResponse);
    });

    it('should return a 500 error if an exception occurs', async () => {
      const prompt = 'This is a test prompt';
      const errorMessage = 'An error occurred';
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      jest
        .spyOn(appService, 'sendSelectedText')
        .mockRejectedValue(new Error(errorMessage));

      await appController.sendSelectedText(prompt, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: errorMessage,
      });
    });
  });
});
