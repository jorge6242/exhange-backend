import { Repository } from 'typeorm';
import { CustomRepository } from 'src/config/typeorm-ex.decorator';
import { Transaction } from './transaction.entity';

@CustomRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
