import { Repository } from 'typeorm';
import { CustomRepository } from '../config/typeorm-ex.decorator';
import { Transaction } from './transaction.entity';

@CustomRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
