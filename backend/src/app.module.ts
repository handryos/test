import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { databaseConfig } from './infra/config/database.config';
import { BaseModule } from './modules/base.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), BaseModule],
  controllers: [AppController],
})
export class AppModule {}
