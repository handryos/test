import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeModel } from '../../../infra/repositories/sequelize/coffee.model';
import { SequelizeCoffeeRepository } from '../../../infra/repositories/sequelize/coffee.repository';
import { COFFEE_REPOSITORY_TOKEN } from '../../../domain/interfaces/repositories/coffe/coffee.repository.token';
import { CoffeeDomainService } from '../../../domain/services/coffe/coffee.service';
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
      provide: COFFEE_REPOSITORY_TOKEN,
      useClass: SequelizeCoffeeRepository,
    },
    CoffeeDomainService,
    CreateCoffeeUseCase,
    GetAllCoffeesUseCase,
    GetCoffeeByIdUseCase,
    GetCoffeeByNameUseCase,
    UpdateCoffeeUseCase,
    DeleteCoffeeUseCase,
  ],
  exports: [
    COFFEE_REPOSITORY_TOKEN,
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
