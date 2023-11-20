/** @format */

import { Transaction, TransactionType } from './Transaction'

describe('Transaction', () => {
  it('should create a transaction', () => {
    const data = {
      amount: 100,
      date: new Date(),
      type: TransactionType.DEPOSIT,
      accountId: '123456789',
    }

    const transaction = Transaction.create(data).getValue()?.toDTO()!

    expect(transaction.amount).toBe(data.amount)
    expect(transaction.date).toBe(data.date)
    expect(transaction.type).toBe(data.type)
    expect(transaction.account).toBe(data.accountId)
  })

  it('should fail when amount is negative', () => {
    const data = {
      amount: -100,
      date: new Date(),
      type: TransactionType.DEPOSIT,
      accountId: '123456789',
    }

    const transaction = Transaction.create(data)

    expect(transaction.isFailure).toBe(true)
    expect(transaction).toMatchObject({
      error: 'El importe a retirar no puede ser negativo',
    })
  })
})
