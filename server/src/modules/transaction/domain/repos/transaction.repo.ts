/** @format */

import { Result } from '../../../../shared/core/Result'
import { Transaction } from '../entities/Transaction'

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Result<void>>
  getByAccountId(accountId: string): Promise<Transaction[]>
}
