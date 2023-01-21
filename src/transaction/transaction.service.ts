import { Injectable } from '@nestjs/common';
import { StoreTransactionDto } from './dto/store-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private repo: TransactionRepository) {}

  async get(): Promise<Transaction[]> {
    return this.repo.find();
  }

  async store(params: StoreTransactionDto) {
    const { currencyFrom, amount1, currencyTo, amount2 } = params;
    return this.repo
      .create({
        currencyFrom,
        amount1,
        currencyTo,
        amount2,
      })
      .save();
  }
}
