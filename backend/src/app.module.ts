import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { databaseConfig } from './infra/config/database.config';
import { BaseModule } from './modules/base.module';
import { TokenBlacklistService } from './infra/services/token-blacklist.service';
import { JwtAuthGuard } from './infra/guards/jwt-auth.guard';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
    BaseModule,
    SentryModule.forRoot(),
  ],
  controllers: [AppController],

  providers: [
    TokenBlacklistService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
