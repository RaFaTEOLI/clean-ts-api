import { Controller } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/load-surveys-factory';
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller';

export const makeLoadSurveysController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveysController(makeDbLoadSurveys())
  );
};
