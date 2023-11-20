/** @format */

import { Transaction, TransactionType } from '../../domain/entities/Transaction'
import { TransactionRepository } from './transaction.repo'

const repo = new TransactionRepository()

describe('Transaction Repository', () => {
  const transaction = Transaction.create({
    accountId: '1',
    amount: 1000,
    type: TransactionType.DEPOSIT,
    date: new Date(),
  })

  it('should save a transaction successfully', async () => {
    const result = await repo.save(transaction.getValue()!)

    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBeUndefined()
  })

  it('should get a transaction successfully', async () => {
    const result = await repo.getByAccountId('1')

    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject(transaction.getValue()!)
  })
})
