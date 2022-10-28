import { badRequest, serverError, unauthorized, forbidden } from './components';
import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths';
import {
  accountSchema,
  addSurveyParamsSchema,
  apiKeyAuthSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyParamsSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultAnswerSchema,
  surveyResultSchema,
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
      name: 'Authentication'
    },
    { name: 'Survey' }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
    '/signup': signUpPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
    signUpParams: signUpParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResultAnswer: surveyResultAnswerSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden
  }
};
