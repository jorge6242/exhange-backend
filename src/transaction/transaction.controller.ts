import { Body, Controller, Post, ValidationPipe, Get } from '@nestjs/common';
import { StoreTransactionDto } from './dto/store-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  async get() {
    return this.service.get();
  }

  @Post()
  async store(@Body(ValidationPipe) body: StoreTransactionDto) {
    return this.service.store(body);
  }
}
