import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeRepository } from '../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeDomainService } from '../../../domain/services/coffe/coffee.service';
import { CoffeeModel } from '../../../infra/repositories/sequelize/coffee.model';
import { SequelizeCoffeeRepository } from '../../../infra/repositories/sequelize/coffee.repository';
import { CreateCoffeeUseCase } from './create/create-coffee.use-case';
import { DeleteCoffeeUseCase } from './delete/delete-coffee.use-case';
import { GetAllCoffeesUseCase } from './get-all/get-all-coffees.use-case';
import { GetCoffeeByIdUseCase } from './get-by-id/get-coffee-by-id.use-case';
import { GetCoffeeByNameUseCase } from './get-by-name/get-coffee-by-name.use-case';
import { UpdateCoffeeUseCase } from './update/update-coffee.use-case';

@Module({
  imports: [SequelizeModule.forFeature([CoffeeModel])],
  providers: [
    {
      provide: 'CoffeeRepository',
      useClass: SequelizeCoffeeRepository,
    },
    {
      provide: CoffeeDomainService,
      useFactory: (coffeeRepository: CoffeeRepository) => {
        return new CoffeeDomainService(coffeeRepository);
      },
      inject: ['CoffeeRepository'],
    },
    {
      provide: CreateCoffeeUseCase,
      useFactory: (
        coffeeRepository: CoffeeRepository,
        coffeeDomainService: CoffeeDomainService,
      ) => {
        return new CreateCoffeeUseCase(coffeeRepository, coffeeDomainService);
      },
      inject: ['CoffeeRepository', CoffeeDomainService],
    },
    {
      provide: GetAllCoffeesUseCase,
      useFactory: (coffeeRepository: CoffeeRepository) => {
        return new GetAllCoffeesUseCase(coffeeRepository);
      },
      inject: ['CoffeeRepository'],
    },
    {
      provide: GetCoffeeByIdUseCase,
      useFactory: (coffeeRepository: CoffeeRepository) => {
        return new GetCoffeeByIdUseCase(coffeeRepository);
      },
      inject: ['CoffeeRepository'],
    },
    {
      provide: GetCoffeeByNameUseCase,
      useFactory: (coffeeRepository: CoffeeRepository) => {
        return new GetCoffeeByNameUseCase(coffeeRepository);
      },
      inject: ['CoffeeRepository'],
    },
    {
      provide: UpdateCoffeeUseCase,
      useFactory: (
        coffeeRepository: CoffeeRepository,
        coffeeDomainService: CoffeeDomainService,
      ) => {
        return new UpdateCoffeeUseCase(coffeeRepository, coffeeDomainService);
      },
      inject: ['CoffeeRepository', CoffeeDomainService],
    },
    {
      provide: DeleteCoffeeUseCase,
      useFactory: (coffeeRepository: CoffeeRepository) => {
        return new DeleteCoffeeUseCase(coffeeRepository);
      },
      inject: ['CoffeeRepository'],
    },
  ],
  exports: [
    'CoffeeRepository',
    CoffeeDomainService,
    CreateCoffeeUseCase,
    GetAllCoffeesUseCase,
    GetCoffeeByIdUseCase,
    GetCoffeeByNameUseCase,
    UpdateCoffeeUseCase,
    DeleteCoffeeUseCase,
  ],
})
export class CoffeeUseCasesModule {}
