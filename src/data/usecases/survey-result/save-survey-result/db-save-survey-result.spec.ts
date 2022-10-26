import {
  SaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
} from './db-save-survey-result-protocols';
import { DbSaveSurveyResult } from './db-save-survey-result';
import MockDate from 'mockdate';

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel =>
  Object.assign({}, makeFakeSurveyResultData(), {
    id: 'any_id',
  });

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(
      surveyResultData: SaveSurveyResultModel
    ): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe('DdSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = makeFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('should return a SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResultData = await sut.save(makeFakeSurveyResultData());
    expect(surveyResultData).toEqual(makeFakeSurveyResult());
  });

  test('should throw exception if SaveSurveyResultRepository throws exception', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockRejectedValueOnce(new Error());
    const promise = sut.save(makeFakeSurveyResultData());
    await expect(promise).rejects.toThrow();
  });
});
