import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeController } from '../../infra/http/controllers/coffe/coffee.controller';
import { CoffeeModel } from '../../infra/repositories/sequelize/coffee.model';
import { SequelizeCoffeeRepository } from '../../infra/repositories/sequelize/coffee.repository';
import { COFFEE_REPOSITORY_TOKEN } from '../../domain/interfaces/repositories/coffe/coffee.repository.token';
import { CoffeeUseCasesModule } from '../../application/use-cases/coffe/coffee-use-cases.module';

@Module({
  imports: [SequelizeModule.forFeature([CoffeeModel]), CoffeeUseCasesModule],
  controllers: [CoffeeController],
  providers: [
    {
      provide: COFFEE_REPOSITORY_TOKEN,
      useClass: SequelizeCoffeeRepository,
    },
  ],
  exports: [COFFEE_REPOSITORY_TOKEN, CoffeeUseCasesModule],
})
export class CoffeeModule {}
