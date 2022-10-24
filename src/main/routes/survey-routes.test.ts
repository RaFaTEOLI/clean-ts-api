import { Collection, ObjectId } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';
import { sign } from 'jsonwebtoken';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('POST /surveys', () => {
    test('should return 403 on survey creation without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com/',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403);
    });

    test('should return 204 on survey creation with a valid admin accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Rafael',
        email: 'rafinha.tessarolo@hotmail.com',
        password: '1234',
        role: 'admin',
      });

      const id = result.insertedId.toString();
      const accessToken = sign({ id }, env.jwtSecret);

      await accountCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            accessToken,
          },
        }
      );

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com/',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    test('should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403);
    });

    test('should return 200 on load surveys with accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'Rafael',
        email: 'rafinha.tessarolo@hotmail.com',
        password: '1234',
        role: 'admin',
      });

      const id = result.insertedId.toString();
      const accessToken = sign({ id }, env.jwtSecret);

      await accountCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            accessToken,
          },
        }
      );

      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer',
            },
          ],
          date: new Date(),
        },
        {
          question: 'other_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer',
            },
          ],
          date: new Date(),
        },
      ]);

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
