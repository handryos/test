import { Module } from '@nestjs/common';
import { CoffeeUseCasesModule } from './coffe/coffee-use-cases.module';

@Module({
  imports: [CoffeeUseCasesModule],
  exports: [CoffeeUseCasesModule],
})
export class ApplicationUseCasesModule {}
