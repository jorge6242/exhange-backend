import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { AlertGateway } from '../alert/alert.gateway';
import { TypeOrmExModule } from '../config/typeorm-ex.module';
import { TransactionRepository } from './transaction.repository';
import { HttpModule } from '@nestjs/axios';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, AlertGateway],
      imports: [
        TypeOrmExModule.forCustomRepository([TransactionRepository]),
        HttpModule,
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
