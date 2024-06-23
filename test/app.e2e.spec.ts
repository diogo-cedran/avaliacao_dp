import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET items', () => {
    return request(app.getHttpServer())
      .get('/items')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/POST items', () => {
    return request(app.getHttpServer())
      .post('/items')
      .send({ name: 'NewItem' })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).toBe('NewItem');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('AuthController (e2e)', () => {
    let app: INestApplication;
  
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('/POST auth/signup', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(201);
    });
  
    it('/POST auth/login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(200)
        .expect((res) => {
          expect(res.body.access_token).toBeDefined();
        });
    });
  
    afterAll(async () => {
      await app.close();
    });
  });
  
