import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express-route-adapter';
import { auth } from '@/main/middlewares/auth/auth';
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()));
};
