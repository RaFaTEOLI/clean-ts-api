import env from '../../config/env';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JWTAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter';
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
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JWTAdapter(env.jwtSecret);
  const dbAuthentication = new DbAuthentication(
    addAccountRepository,
    bcryptAdapter,
    jwtAdapter,
    addAccountRepository
  );
  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation(),
    dbAuthentication
  );
  const logErrorRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logErrorRepository);
};
