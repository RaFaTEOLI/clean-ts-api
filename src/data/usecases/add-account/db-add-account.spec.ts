import { DbAddAccount } from './db-add-account';
import {
  Encrypter,
  AddAccountModel,
  AccountModel,
  AddAccountRepository,
} from './db-add-account-protocols';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('encrypted_password');
    }
  }
  return new EncrypterStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'encrypted_password',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccount());
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  encrypterStub: Encrypter;
  sut: DbAddAccount;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = makeFakeAccountData();
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should throw exception if Encrypter throws exception', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'encrypted_password',
    });
  });

  test('should throw exception if AddAccountRepository throws exception', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error());
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const account = await sut.add(accountData);
    expect(account).toEqual(makeFakeAccount());
  });
});
