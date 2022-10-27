import { LoadSurveysController } from './load-surveys-controller';
import { SurveyModel, LoadSurveys } from './load-surveys-protocols';
import { noContent, serverError, success } from '@/presentation/helpers/http/http-helper';
import MockDate from 'mockdate';
import { mockSurveysData } from '@/domain/test';

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveys implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveysData());
    }
  }
  return new LoadSurveys();
};

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(success(mockSurveysData()));
  });

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValue([]);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test('should return 500 if LoadSurveys throws an exception', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
