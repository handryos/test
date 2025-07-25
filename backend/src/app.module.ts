import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { databaseConfig } from './infra/config/database.config';
import { BaseModule } from './modules/base.module';
import { JwtAuthGuard } from './infra/guards/jwt-auth.guard';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), BaseModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
