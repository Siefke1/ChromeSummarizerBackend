import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from 'openai';

jest.mock('openai', () => {
  const { Configuration } = jest.requireActual('openai');
  const createChatCompletion = jest.fn();

  return {
    OpenAIApi: jest.fn(() => ({
      createChatCompletion,
    })),
    Configuration,
    createChatCompletion,
  };
});

describe('AppService', () => {
  let appService: AppService;
  let openai: jest.Mocked<OpenAIApi>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    const configuration = new Configuration({ apiKey: 'fake-api-key' });
    openai = new OpenAIApi(configuration) as jest.Mocked<OpenAIApi>;
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe('sendSelectedText', () => {
    it('should call OpenAIApi.createChatCompletion with the correct parameters and return a response', async () => {
      const prompt = 'This is a test prompt';
      const apiKey = 'test-api-key';
      const chatCompletionResponse: CreateChatCompletionResponse = {
        id: 'test-id',
        object: 'test-object',
        created: 1234567890,
        model: 'gpt-3.5-turbo',
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
        choices: [
          {
            message: { role: 'assistant', content: 'This is a test summary.' },
            index: 0,
            finish_reason: 'stop',
          },
        ],
      };

      openai.createChatCompletion.mockResolvedValue({
        data: chatCompletionResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as any);

      const response = await appService.sendSelectedText(prompt, apiKey);

      expect(openai.createChatCompletion).toHaveBeenCalledWith({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Please do your best to summarize the following text.',
          },
          {
            role: 'user',
            content: `Please summarize this text: ${prompt}`,
          },
        ],
        temperature: 1,
        max_tokens: 2048,
      });
      expect(response).toEqual(chatCompletionResponse);
    });
  });
});
