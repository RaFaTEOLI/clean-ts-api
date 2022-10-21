import { LoadSurveysController } from './load-surveys-controller';
import { SurveyModel, LoadSurveys } from './load-surveys-protocols';
import { serverError, success } from '../../../helpers/http/http-helper';
import MockDate from 'mockdate';

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveys implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return await Promise.resolve(makeFakeSurveys());
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
    loadSurveysStub,
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
    expect(httpResponse).toEqual(success(makeFakeSurveys()));
  });

  test('should return 500 if LoadSurveys throws an exception', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
