import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmExModule } from '../config/typeorm-ex.module';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TransactionRepository])],

  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
