import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { AlertGateway } from '../alert/alert.gateway';
import { StoreTransactionDto } from './dto/store-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { Cron } from '@nestjs/schedule';
import { EXCHANGE_TOKEN } from 'src/constants/env';

interface IRate {
  type: string;
  rate: number;
}

@Injectable()
export class TransactionService {
  public URL_EXCHANGE = `http://api.coinlayer.com/live?access_key=${EXCHANGE_TOKEN}`;
  constructor(
    private repo: TransactionRepository,
    private httpService: HttpService,
    private alert: AlertGateway,
  ) {}

  getRate(list: { [key: string]: number }): IRate[] {
    const references = ['BTC', 'ETH'];
    const rates = [...Object.keys(list)].reduce((acc: any, e: any) => {
      if (references.includes(e)) {
        const property = { type: e, rate: list[e] };
        return [...acc, property];
      }
      return acc;
    }, []);
    return rates;
  }

  /* Get the history exchange */
  async get(
    query: PaginateQuery,
  ): Promise<Paginated<Transaction> & { rate: IRate[] }> {
    const res = await this.httpService.get(this.URL_EXCHANGE).toPromise();
    const currentRate = this.getRate({});
    const response = await paginate(query, this.repo, {
      sortableColumns: ['currency_from'],
      defaultSortBy: [['id', 'DESC']],
    });
    return { ...response, rate: currentRate };
  }

  /* Store the Exchange */
  async store(params: StoreTransactionDto) {
    const { currencyFrom, amount1, currencyTo, amount2, type } = params;
    return this.repo
      .create({
        currency_from: currencyFrom,
        amount_1: amount1,
        currency_to: currencyTo,
        amount_2: amount2,
        type,
      })
      .save();
  }

  /* Listener to check the rate every minute */
  @Cron('* * * * *')
  async updateHistory() {
    const res = await this.httpService.get(this.URL_EXCHANGE).toPromise();
    const currentRate = this.getRate(res.data.rates);

    if (currentRate.length) {
      for (const item of currentRate) {
        const conversion = 1 * item.rate;
        await this.repo
          .create({
            currency_from: item.type,
            amount_1: 1,
            currency_to: 'USD',
            amount_2: Math.round(conversion),
            type: 'Live Price',
          })
          .save();
        this.alert.incomingMessage('Updated');
      }
    }
  }
}
