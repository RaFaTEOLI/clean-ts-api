import { badRequest, serverError, unauthorized, forbidden } from './components';
import { loginPath, surveyPath } from './paths';
import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema
} from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean TS API',
    description: '🧼 NodeJs API with Typescript, TDD, Clean Architecture, Design Patterns and SOLID Principles',
    version: '1.0.0'
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    {
      name: 'Login'
    },
    { name: 'Survey' }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    forbidden
  }
};
