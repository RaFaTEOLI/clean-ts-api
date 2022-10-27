import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller';
import { makeDbSaveSurveyResult } from '@/main/factories/usecases/save-survey-result/save-survey-result/db-save-survey-result-factory';
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/load-surveys-factory';

export const makeSaveSurveyResultController = (): Controller => {
  return makeLogControllerDecorator(
    new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  );
};
