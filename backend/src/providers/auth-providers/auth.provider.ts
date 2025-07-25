import { Provider } from '@nestjs/common';
import { RegisterUseCase } from 'src/application/use-cases/auth/register/register.use-case';
import { LoginUseCase } from 'src/application/use-cases/auth/login/login.use-case';
import { UserRepository } from 'src/domain/interfaces/repositories/user/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from 'src/domain/interfaces/repositories/user/user.repository.token';
import { SequelizeUserRepository } from 'src/infra/repositories/sequelize/user.repository';
import { REGISTER_USE_CASE, LOGIN_USE_CASE } from '../../modules/auth/auth-use-case.tokens';

export const USER_REPOSITORY_PROVIDER: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: SequelizeUserRepository,
};

export const AUTH_USE_CASES_PROVIDERS: Provider[] = [
  {
    provide: REGISTER_USE_CASE,
    useFactory: (userRepository: UserRepository) => {
      return new RegisterUseCase(userRepository);
    },
    inject: [USER_REPOSITORY_TOKEN],
  },
  {
    provide: LOGIN_USE_CASE,
    useFactory: (userRepository: UserRepository) => {
      return new LoginUseCase(userRepository);
    },
    inject: [USER_REPOSITORY_TOKEN],
  },
];

export const AUTH_PROVIDERS: Provider[] = [
  USER_REPOSITORY_PROVIDER,
  ...AUTH_USE_CASES_PROVIDERS,
];
