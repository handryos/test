import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeController } from '../../infra/http/controllers/coffe/coffee.controller';
import { CoffeeModel } from '../../infra/repositories/sequelize/coffee.model';
import { SequelizeCoffeeRepository } from '../../infra/repositories/sequelize/coffee.repository';
import { CoffeeUseCasesModule } from '../../application/use-cases/coffe/coffee-use-cases.module';

@Module({
  imports: [SequelizeModule.forFeature([CoffeeModel]), CoffeeUseCasesModule],
  controllers: [CoffeeController],
  providers: [
    {
      provide: 'CoffeeRepository',
      useClass: SequelizeCoffeeRepository,
    },
  ],
  exports: ['CoffeeRepository', CoffeeUseCasesModule],
})
export class CoffeeModule {}
