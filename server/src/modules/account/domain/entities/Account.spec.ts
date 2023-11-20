/** @format */

import {
  Transaction,
  TransactionType,
} from '../../../transaction/domain/entities/Transaction'
import { Account } from './Account'

describe('Account', () => {
  it('should create an account', () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    }).getValue()!

    expect(account.transactions).toHaveLength(0)
    expect(account.ownerId).toBe('1')

    expect(account.toDTO()).toMatchObject({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      id: account.id.toString(),
      transactions: [],
    })
  })
  it('should fail when number is not a number', () => {
    const account = Account.create({
      number: 'asdasd' as any,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    })

    expect(account.isFailure).toBe(true)
    expect(account).toMatchObject({
      error: 'Number must be a number',
    })
  })
  it('should fail when name is empty', () => {
    const account = Account.create({
      number: 123456,
      name: '',
      balance: 1000,
      userId: '1',
    })

    expect(account.isFailure).toBe(true)
    expect(account).toMatchObject({
      error: 'Name cannot be empty',
    })
  })
  it('should fail when balance is not a number', () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 'asdasd' as any,
      userId: '1',
    })

    expect(account.isFailure).toBe(true)
    expect(account).toMatchObject({
      error: 'Balance must be a number',
    })
  })

  it('should fail when balance is negative', () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: -1000,
      userId: '1',
    })

    expect(account.isFailure).toBe(true)
    expect(account).toMatchObject({
      error: 'Balance cannot be negative',
    })
  })
  it('should fail when userId is empty', () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '',
    })

    expect(account.isFailure).toBe(true)
    expect(account).toMatchObject({
      error: 'User id cannot be empty',
    })
  })

  it("should success addTransaction when is withdraw and balance is more than transaction's amount", () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    })

    const transaction = Transaction.create({
      amount: 100,
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
      date: new Date(),
    })

    const result = account.getValue()!.addTransaction(transaction.getValue()!)

    expect(result.isSuccess).toBe(true)
    expect(account.getValue()!.balance).toBe(900)

    expect(result.getValue()).toMatchObject(transaction.getValue()!)
  })

  it("should success addTransaction when transaction's type is deposit", () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    })

    const transaction = Transaction.create({
      amount: 100,
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.DEPOSIT,
      date: new Date(),
    })

    const result = account.getValue()!.addTransaction(transaction.getValue()!)

    expect(result.isSuccess).toBe(true)
    expect(account.getValue()!.balance).toBe(1100)

    expect(result.getValue()).toMatchObject(transaction.getValue()!)

    expect(account.getValue()!.toDTO().transactions).toHaveLength(1)
  })

  it('should fail addTransaction when transaction withdraw amount is more than balance', () => {
    const account = Account.create({
      number: 12345610,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    })

    const transaction = Transaction.create({
      amount: 1500,
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
      date: new Date(),
    })

    const result = account.getValue()!.addTransaction(transaction.getValue()!)

    expect(result.isFailure).toBe(true)
    expect(account.getValue()!.balance).toBe(1000)
    expect(result).toMatchObject({
      error: 'No hay suficiente saldo en la cuenta',
    })
  })
})
