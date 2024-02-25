import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import getQuery from './query';

describe('Query daily', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('areaCode 230010', () => {
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('230010'),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.daily.reportDatetime).toBeDefined();
      });
  });
});
