import {
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
  SaveSurveyResult,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(surveyData: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(surveyData);
    return surveyResult;
  }
}
