import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoffeeModule, AuthModule],
  exports: [CoffeeModule, AuthModule],
})
export class BaseModule {}
