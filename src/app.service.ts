import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateChatCompletionResponse } from 'openai';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendSelectedText(
    prompt: string,
    apiKey: string,
  ): Promise<CreateChatCompletionResponse> {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
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
    return response.data;
  }
}
