import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import dbconfiguration from './config/dbconfiguration';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from './datasource/typeorm.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    ...dbconfiguration()
  }), TypeOrmModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
