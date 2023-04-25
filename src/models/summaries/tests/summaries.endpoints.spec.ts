import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';

let app: INestApplication;
let httpServer: any;
let connection: any;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleFixture.createNestApplication();
  await app.init();
  httpServer = app.getHttpServer();
  connection = await moduleFixture.get(getConnectionToken());
});

afterAll(async () => {
  await connection.dropDatabase();
  await app.close();
});

describe('Summaries API Endpoints', () => {
  describe('GET /summaries', () => {
    it('should return an array of summaries', () => {
      return request(httpServer)
        .get('/summaries')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('POST /summaries', () => {
    it('should create a summary', () => {
      const newSummary = {
        title: 'Test Title 2',
        source: 'Test Source 2',
        summaryText: 'Test Summary Text 2',
        originalText: 'Test Original Text 2',
        tags: ['tag3', 'tag4'],
      };
      return request(httpServer)
        .post('/summaries')
        .send(newSummary)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject(newSummary);
        });
    });
  });

  describe('DELETE /summaries/:id', () => {
    let createdSummaryId: string;

    beforeAll(async () => {
      const newSummary = {
        title: 'Test Title for Deletion',
        source: 'Test Source for Deletion',
        summaryText: 'Test Summary Text for Deletion',
        originalText: 'Test Original Text for Deletion',
        tags: ['tagToDelete1', 'tagToDelete2'],
      };
      const response = await request(httpServer)
        .post('/summaries')
        .send(newSummary);
      createdSummaryId = response.body._id;
    });

    it('should delete a summary', () => {
      return request(httpServer)
        .delete(`/summaries/${createdSummaryId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toEqual(createdSummaryId);
        });
    });
  });
});
