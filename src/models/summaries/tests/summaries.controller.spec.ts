import { Test, TestingModule } from '@nestjs/testing';
import { SummariesController } from '../summaries.controller';
import { SummariesService } from '../summaries.service';
import { Summary } from '../../schemas/summary.schema';

const mockSummariesService = () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

describe('SummariesController', () => {
  let controller: SummariesController;
  let service: SummariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummariesController],
      providers: [
        {
          provide: SummariesService,
          useFactory: mockSummariesService,
        },
      ],
    }).compile();

    controller = module.get<SummariesController>(SummariesController);
    service = module.get<SummariesService>(SummariesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of summaries', async () => {
      const result: Summary[] = [
        {
          _id: '1',
          title: 'Test Title 1',
          source: 'Test Source 1',
          summaryText: 'Test Summary Text 1',
          originalText: 'Test Original Text 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: ['tag1', 'tag2'],
        },
      ];
      jest
        .spyOn(service, 'findAll')
        .mockImplementationOnce(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a summary', async () => {
      const newSummary: Summary = {
        _id: '2',
        title: 'Test Title 2',
        source: 'Test Source 2',
        summaryText: 'Test Summary Text 2',
        originalText: 'Test Original Text 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['tag3', 'tag4'],
      };
      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() => Promise.resolve(newSummary));

      expect(await controller.create(newSummary)).toBe(newSummary);
    });
  });

  describe('delete', () => {
    it('should delete a summary', async () => {
      const deletedSummary: Summary = {
        _id: '1',
        title: 'Test Title 1',
        source: 'Test Source 1',
        summaryText: 'Test Summary Text 1',
        originalText: 'Test Original Text 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['tag1', 'tag2'],
      };
      jest
        .spyOn(service, 'delete')
        .mockImplementationOnce(() => Promise.resolve(deletedSummary));

      expect(await controller.delete(deletedSummary._id)).toBe(deletedSummary);
    });
  });
});
