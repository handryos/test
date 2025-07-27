import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeModel } from '../../infra/repositories/sequelize/coffee.model';
import { SequelizeCoffeeRepository } from '../../infra/repositories/sequelize/coffee.repository';
import { COFFEE_REPOSITORY_TOKEN } from '../../domain/interfaces/repositories/coffe/coffee.repository.token';
import { CoffeeDomainService } from 'src/domain/services/coffe';
import {
  CREATE_COFFEE_USE_CASE,
  GET_ALL_COFFEES_USE_CASE,
  GET_COFFEE_BY_ID_USE_CASE,
  GET_COFFEE_BY_NAME_USE_CASE,
  UPDATE_COFFEE_USE_CASE,
  DELETE_COFFEE_USE_CASE,
} from './use-case.tokens';
import { COFFEE_PROVIDERS } from 'src/providers/coffe-providers/coffee.provider';
import { CoffeeController } from 'src/infra/http/controllers/coffee';

@Module({
  imports: [SequelizeModule.forFeature([CoffeeModel])],
  controllers: [CoffeeController],
  providers: [
    {
      provide: COFFEE_REPOSITORY_TOKEN,
      useClass: SequelizeCoffeeRepository,
    },
    ...COFFEE_PROVIDERS,
  ],
  exports: [
    COFFEE_REPOSITORY_TOKEN,
    COFFEE_REPOSITORY_TOKEN,
    CoffeeDomainService,
    CREATE_COFFEE_USE_CASE,
    GET_ALL_COFFEES_USE_CASE,
    GET_COFFEE_BY_ID_USE_CASE,
    GET_COFFEE_BY_NAME_USE_CASE,
    UPDATE_COFFEE_USE_CASE,
    DELETE_COFFEE_USE_CASE,
  ],
})
export class CoffeeModule {}
