import { Provider } from '@nestjs/common';
import { CreateCoffeeUseCase, GetAllCoffeesUseCase, GetCoffeeByIdUseCase, GetCoffeeByNameUseCase, UpdateCoffeeUseCase, DeleteCoffeeUseCase } from 'src/application/use-cases/coffe';
import { COFFEE_REPOSITORY_TOKEN, CoffeeRepository } from 'src/domain/interfaces/repositories/coffe';
import { CoffeeDomainService } from 'src/domain/services/coffe';
import { SequelizeCoffeeRepository } from 'src/infra/repositories/sequelize/coffee.repository';
import { CREATE_COFFEE_USE_CASE, GET_ALL_COFFEES_USE_CASE, GET_COFFEE_BY_ID_USE_CASE, GET_COFFEE_BY_NAME_USE_CASE, UPDATE_COFFEE_USE_CASE, DELETE_COFFEE_USE_CASE } from 'src/modules/coffe/use-case.tokens';

export const COFFEE_REPOSITORY_PROVIDER: Provider = {
  provide: COFFEE_REPOSITORY_TOKEN,
  useClass: SequelizeCoffeeRepository,
};

export const COFFEE_SERVICES_PROVIDERS: Provider[] = [
  {
    provide: CoffeeDomainService,
    useFactory: (coffeeRepository: CoffeeRepository) => {
      return new CoffeeDomainService(coffeeRepository);
    },
    inject: [COFFEE_REPOSITORY_TOKEN],
  },
];

export const COFFEE_USE_CASES_PROVIDERS: Provider[] = [
  {
    provide: CREATE_COFFEE_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository, coffeeDomainService: CoffeeDomainService) => {
      return new CreateCoffeeUseCase(coffeeRepository, coffeeDomainService);
    },
    inject: [COFFEE_REPOSITORY_TOKEN, CoffeeDomainService],
  },
  {
    provide: GET_ALL_COFFEES_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository) => {
      return new GetAllCoffeesUseCase(coffeeRepository);
    },
    inject: [COFFEE_REPOSITORY_TOKEN],
  },
  {
    provide: GET_COFFEE_BY_ID_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository) => {
      return new GetCoffeeByIdUseCase(coffeeRepository);
    },
    inject: [COFFEE_REPOSITORY_TOKEN],
  },
  {
    provide: GET_COFFEE_BY_NAME_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository) => {
      return new GetCoffeeByNameUseCase(coffeeRepository);
    },
    inject: [COFFEE_REPOSITORY_TOKEN],
  },
  {
    provide: UPDATE_COFFEE_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository, coffeeDomainService: CoffeeDomainService) => {
      return new UpdateCoffeeUseCase(coffeeRepository, coffeeDomainService);
    },
    inject: [COFFEE_REPOSITORY_TOKEN, CoffeeDomainService],
  },
  {
    provide: DELETE_COFFEE_USE_CASE,
    useFactory: (coffeeRepository: CoffeeRepository) => {
      return new DeleteCoffeeUseCase(coffeeRepository);
    },
    inject: [COFFEE_REPOSITORY_TOKEN],
  },
];

export const COFFEE_PROVIDERS: Provider[] = [
  COFFEE_REPOSITORY_PROVIDER,
  ...COFFEE_SERVICES_PROVIDERS,
  ...COFFEE_USE_CASES_PROVIDERS,
];
