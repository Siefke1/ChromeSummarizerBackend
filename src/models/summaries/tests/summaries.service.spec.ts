// summaries.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummariesService } from '../summaries.service';
import { Summary } from '../../schemas/summary.schema';

describe('SummariesService', () => {
  let service: SummariesService;
  let model: Model<Summary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummariesService,
        {
          provide: getModelToken('Summary'),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SummariesService>(SummariesService);
    model = module.get<Model<Summary>>(getModelToken('Summary'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of summaries', async () => {
      const result: Summary[] = [
        {
          _id: '1',
          title: 'Test summary 1',
          source: 'Test source 1',
          summaryText: 'Test summary text 1',
          originalText: 'Test original text 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: ['tag1', 'tag2'],
        },
        {
          _id: '2',
          title: 'Test summary 2',
          source: 'Test source 2',
          summaryText: 'Test summary text 2',
          originalText: 'Test original text 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: ['tag1', 'tag2'],
        },
      ];

      const findMock = jest.fn();
      const sortMock = jest.fn();
      const execMock = jest.fn().mockResolvedValue(result);

      findMock.mockReturnValue({ sort: sortMock });
      sortMock.mockReturnValue({ exec: execMock });

      jest.spyOn(model, 'find').mockImplementation(findMock);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a summary', async () => {
      const summary: Summary = {
        _id: '2',
        title: 'Test summary 2',
        source: 'Test source 2',
        summaryText: 'Test summary text 2',
        originalText: 'Test original text 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['tag1', 'tag2'],
      };

      jest.spyOn(model, 'create').mockResolvedValueOnce(summary as any);

      expect(await service.create(summary)).toBe(summary);
    });
  });

  describe('delete', () => {
    it('should delete a summary by id', async () => {
      const id = '1';

      const summary: Summary = {
        _id: '3',
        title: 'Test summary 3',
        source: 'Test source 3',
        summaryText: 'Test summary text 3',
        originalText: 'Test original text 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['tag1', 'tag2'],
      };

      jest
        .spyOn(model, 'findByIdAndRemove')
        .mockResolvedValueOnce(summary as any);

      expect(await service.delete(id)).toBe(summary);
    });
  });
});
