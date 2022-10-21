import jwt from 'jsonwebtoken';
import { JWTAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return await Promise.resolve('any_token');
  },
}));

const makeSut = (): JWTAdapter => {
  return new JWTAdapter('secret');
};

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    test('should return a token on sign success', async () => {
      const sut = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });

    test('should throw an exception if jwt throws an exception', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockRejectedValueOnce(new Error() as never);
      const promise = sut.encrypt('any_id');
      await expect(promise).rejects.toThrow();
    });
  });
});
