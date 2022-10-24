import { AccountModel } from '@/data/usecases/add-account/db-add-account-protocols';

export interface LoadAccountByTokenRepository {
  loadByToken: (
    accessToken: string,
    role?: string
  ) => Promise<AccountModel | null>;
}
