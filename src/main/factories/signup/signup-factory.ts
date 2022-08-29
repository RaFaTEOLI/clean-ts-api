import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const hasher = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(hasher, addAccountRepository);
  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation()
  );
  const logErrorRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logErrorRepository);
};