import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { SurveyModel } from '@/domain/models/survey';
import { mockSurveyModel, mockSurveysData } from '@/domain/test';
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(survey: AddSurveyParams): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveysData());
    }
  }
  return new LoadSurveysRepositoryStub();
};
