/** @format */

import { Result } from '../../../../shared/core/Result'
import { Transaction } from '../../domain/entities/Transaction'
import { ITransactionRepository } from '../../domain/repos/transaction.repo'

const transactions: Transaction[] = []

export class TransactionRepository implements ITransactionRepository {
  async save(transaction: Transaction) {
    transactions.push(transaction)

    return Result.ok<void>()
  }

  async getByAccountId(accountId: string): Promise<Transaction[]> {
    const accountTransactions = transactions.filter(
      (transaction) => transaction.accountId === accountId
    )

    return accountTransactions
  }
}
