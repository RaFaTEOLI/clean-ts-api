import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(surveyData: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    const result = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: surveyData.surveyId,
        accountId: surveyData.accountId
      },
      {
        $set: { answer: surveyData.answer, date: surveyData.date }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );
    return MongoHelper.format(result.value);
  }
}
