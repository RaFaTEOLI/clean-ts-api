import { loginPath } from './paths';
import { accountSchema, loginParamsSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean TS API',
    description: '🧼 NodeJs API with Typescript, TDD, Clean Architecture, Design Patterns and SOLID Principles',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    {
      name: 'Login'
    }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
};
