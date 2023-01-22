import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmExModule } from '../config/typeorm-ex.module';
import { TransactionRepository } from './transaction.repository';
import { AlertGateway } from '../alert/alert.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([TransactionRepository]),
    HttpModule,
  ],
  providers: [TransactionService, AlertGateway],
  controllers: [TransactionController],
})
export class TransactionModule {}
