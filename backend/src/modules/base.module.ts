import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffe/coffee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoffeeModule, AuthModule],
  exports: [CoffeeModule, AuthModule],
})
export class BaseModule {}
