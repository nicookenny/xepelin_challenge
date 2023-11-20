/** @format */

import { Account } from '../../../account/domain/entities/Account'
import {
  Transaction,
  TransactionType,
} from '../../../transaction/domain/entities/Transaction'
import { Password } from './Password'
import { User } from './User'

const password = Password.create({ value: '123456' })
  .getValue()
  ?.getHashedValue()!
describe('User', () => {
  it('should create a user', () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data).getValue()!

    expect(user.document).toBe(data.document)
    expect(user.id).toBeDefined()
    expect(user.account).toBeUndefined()
    expect(user.name).toBe(data.name)
    expect(user.password.value).toBe(data.password.value)
  })

  it('should fail when no document is provided', () => {
    const data = {
      document: '',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data)

    expect(user.isFailure).toBe(true)
    expect(user).toMatchObject({
      error: 'El documento no puede estar vacío',
    })
  })

  it('should fail when no password is provided', () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: null as unknown as Password,
    }

    const user = User.create(data)

    expect(user.isFailure).toBe(true)
    expect(user).toMatchObject({
      error: 'La contraseña no puede estar vacía',
    })
  })

  it('should add account successfully and fail when try to add another account', () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data).getValue()!

    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: user.id.toString(),
    })

    const result = user.addAccount(account.getValue()!)

    expect(result.isSuccess).toBe(true)

    expect(user.account).toBeDefined()

    const result2 = user.addAccount(account.getValue()!)

    expect(result2.isFailure).toBe(true)
    expect(result2).toMatchObject({
      error: 'El usuario ya tiene una cuenta',
    })
  })

  it("should fail when user doesnt have an account and try to add a transaction to it's account", () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data).getValue()!

    const transaction = Transaction.create({
      amount: 100,
      accountId: '1',
      type: TransactionType.DEPOSIT,
      date: new Date(),
    })

    const result = user.addTransactionToAccount(transaction.getValue()!)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject({
      error: 'No se puede agregar una transacción a una cuenta inexistente',
    })
  })

  it('should add a transaction successfully when user have an account', () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data).getValue()!

    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: user.id.toString(),
    })

    user.addAccount(account.getValue()!)

    const transaction = Transaction.create({
      amount: 100,
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.DEPOSIT,
      date: new Date(),
    })

    const result = user.addTransactionToAccount(transaction.getValue()!)

    expect(result.isSuccess).toBe(true)
    expect(account.getValue()!.balance).toBe(1100)
  })

  it("should fail when try to withdraw and user's balance is less than transaction's amount", () => {
    const data = {
      document: '123456789',
      name: 'Pedro',
      password: Password.create({ value: password, hashed: true }).getValue()!,
    }

    const user = User.create(data).getValue()!

    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: user.id.toString(),
    })

    user.addAccount(account.getValue()!)

    const transaction = Transaction.create({
      amount: 10000,
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
      date: new Date(),
    })

    const result = user.addTransactionToAccount(transaction.getValue()!)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject({
      error: 'No hay suficiente saldo en la cuenta',
    })
  })
})
