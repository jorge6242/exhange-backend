import { Body, Controller, Post, ValidationPipe, Get } from '@nestjs/common';
import { StoreTransactionDto } from './dto/store-transaction.dto';
import { TransactionService } from './transaction.service';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Transaction } from './transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  async get(@Paginate() query: PaginateQuery): Promise<Paginated<Transaction>> {
    return this.service.get(query);
  }

  @Post()
  async store(@Body(ValidationPipe) body: StoreTransactionDto) {
    return this.service.store(body);
  }
}
