import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';
import { DbAddSurvey } from './db-add-survey';

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

describe('DdAddSurvey Usecase', () => {
  test('should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add(survey: AddSurveyModel): Promise<void> {
        return await Promise.resolve();
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
