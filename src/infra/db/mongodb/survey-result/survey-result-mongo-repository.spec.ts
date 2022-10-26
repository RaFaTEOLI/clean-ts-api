import { AccountModel } from '@/domain/models/account';
import { SurveyModel } from '@/domain/models/survey';
import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyResultMongoRepository } from './survey-result-mongo-repository';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository();
};

const makeSurvey = async (): Promise<SurveyModel> => {
  const data = {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  };
  const result = await surveyCollection.insertOne(data);
  return MongoHelper.map(result, data);
};

const makeAccount = async (): Promise<AccountModel> => {
  const data = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  };
  const result = await accountCollection.insertOne(data);
  return MongoHelper.map(result, data);
};

describe('SurveyResultMongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('account');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('save()', () => {
    test('should add a survey result if it does not exist', async () => {
      const sut = makeSut();
      const survey = await makeSurvey();
      const account = await makeAccount();
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});
