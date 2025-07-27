import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infra/guards/jwt-auth.guard';

@Module({
  imports: [CoffeeModule, AuthModule],
  exports: [CoffeeModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class BaseModule {}
