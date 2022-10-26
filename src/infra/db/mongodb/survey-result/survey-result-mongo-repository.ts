import {
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
  SurveyResultModel
} from '@/data/usecases/save-survey-result/db-save-survey-result-protocols';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(surveyData: SaveSurveyResultModel): Promise<SurveyResultModel> {
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
