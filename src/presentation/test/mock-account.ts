import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account';
import { AccountModel } from '@/domain/models/account';
import { mockAccountModel } from '@/domain/test';

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel();
      return await Promise.resolve(fakeAccount);
    }
  }
  return new AddAccountStub();
};
