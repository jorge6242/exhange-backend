import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';
import { AlertGateway } from './alert/alert.gateway';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TransactionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AlertGateway],
})
export class AppModule {}
