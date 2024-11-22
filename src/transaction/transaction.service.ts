import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  getTransactions(): string {
    return 'List of Transactions';
  }
}
