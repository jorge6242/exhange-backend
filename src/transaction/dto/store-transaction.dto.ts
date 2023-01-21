import { IsNumber, IsString } from 'class-validator';

export class StoreTransactionDto {
  @IsString()
  currencyFrom: string;

  @IsNumber()
  amount1: number;

  @IsString()
  currencyTo: string;

  @IsNumber()
  amount2: number;

  @IsString()
  type: string;
}
