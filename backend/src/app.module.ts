import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { CoffeeModule } from './modules/coffe/coffee.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [SequelizeModule.forRoot(databaseConfig), CoffeeModule],
  controllers: [AppController],
})
export class AppModule {}
