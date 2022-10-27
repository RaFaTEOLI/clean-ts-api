import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result';
import { mockSurveyResultModel } from '@/domain/test';
import { SurveyResultModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols';

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(surveyResultData: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
