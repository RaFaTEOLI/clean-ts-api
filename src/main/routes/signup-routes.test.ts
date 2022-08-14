import request from 'supertest';
import app from '../config/app';

describe('SignUp Routes', () => {
  test('should return 200 on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rafael',
        email: 'rafinha.tessarolo@hotmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
