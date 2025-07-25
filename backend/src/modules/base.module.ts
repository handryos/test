import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffe/coffee.module';

@Module({
  imports: [CoffeeModule],
  exports: [CoffeeModule],
})
export class BaseModule {}
