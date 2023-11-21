/** @format */

import { Result } from '../../../../shared/core/Result'
import { Transaction } from '../../domain/entities/Transaction'
import { ITransactionRepository } from '../../domain/repos/transaction.repo'

export class TransactionRepository implements ITransactionRepository {
  private static instance: TransactionRepository | null = null
  private transactions: Transaction[] = []

  private constructor() {}

  static getInstance(): TransactionRepository {
    if (!TransactionRepository.instance) {
      TransactionRepository.instance = new TransactionRepository()
    }
    return TransactionRepository.instance
  }

  async save(transaction: Transaction) {
    this.transactions.push(transaction)

    return Result.ok<void>()
  }

  async getByAccountId(accountId: string): Promise<Transaction[]> {
    const accountTransactions = this.transactions.filter(
      (transaction) => transaction.accountId === accountId
    )

    return accountTransactions
  }
}
