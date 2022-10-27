import { SaveSurveyResultRepository } from './db-save-survey-result-protocols';
import { DbSaveSurveyResult } from './db-save-survey-result';
import MockDate from 'mockdate';
import { mockSaveSurveyResultRepository } from '@/data/test/mock-db-survey-result';
import { mockSurveyResultParams, mockSurveyResultModel } from '@/domain/test';

interface SutTypes {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub
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
    const surveyResultData = mockSurveyResultParams();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('should return a SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResultData = await sut.save(mockSurveyResultParams());
    expect(surveyResultData).toEqual(mockSurveyResultModel());
  });

  test('should throw exception if SaveSurveyResultRepository throws exception', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error());
    const promise = sut.save(mockSurveyResultParams());
    await expect(promise).rejects.toThrow();
  });
});
