/** @format */

import { Result } from '../../../../shared/core/Result'
import { Entity } from '../../../../shared/domain/Entity'
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID'
import { Transaction } from '../../../transaction/domain/entities/Transaction'

interface AccountProps {
  userId: string
  name: string
  number: number
  balance: number

  transactions?: Transaction[]
}
export class Account extends Entity<AccountProps> {
  constructor(props: AccountProps, id?: UniqueEntityID) {
    super(
      {
        ...props,
        transactions: props.transactions ?? [],
      },
      id
    )
  }

  get id(): UniqueEntityID {
    return this._id
  }

  get ownerId(): string {
    return this.props.userId
  }

  get number(): number {
    return this.props.number
  }

  get balance(): number {
    return this.props.balance
  }

  get transactions(): Transaction[] {
    return this.props.transactions!
  }

  public withdraw(amount: number): Result<void> {
    if (amount < 0) {
      return Result.fail<void>('El importe a retirar no puede ser negativo')
    }

    if (this.balance < amount) {
      return Result.fail<void>('No hay suficiente saldo en la cuenta')
    }

    this.props.balance -= amount

    return Result.ok<void>()
  }

  public deposit(amount: number): Result<void> {
    if (amount < 0) {
      return Result.fail<void>('El importe a depositar no puede ser negativo')
    }

    this.props.balance += amount

    return Result.ok<void>()
  }

  public static create(
    { number, balance, name, transactions, userId }: AccountProps,
    id?: UniqueEntityID
  ): Result<Account> {
    const errors = []

    if (!number) {
      errors.push(Result.fail('Number cannot be empty'))
    }

    if (!name) {
      errors.push(Result.fail('Name cannot be empty'))
    }

    if (balance < 0) {
      errors.push(Result.fail('Balance cannot be negative'))
    }

    if (errors.length) {
      return Result.combine(errors)
    }

    return Result.ok(
      new Account(
        { userId, name, number, balance, transactions: transactions ?? [] },
        id
      )
    )
  }

  addTransaction(transaction: Transaction): Result<Transaction> {
    const { amount, type } = transaction

    const operation = type.toLowerCase() as 'withdraw' | 'deposit'

    const result = this[operation](amount)

    if (result.isFailure) {
      return Result.fail<Transaction>(result.getErrorValue() as string)
    }

    this.props.transactions!.push(transaction)

    return Result.ok<Transaction>(transaction)
  }

  public toDTO() {
    return {
      id: this._id.toString(),
      name: this.props.name,
      owner: this.props.userId,
      number: this.props.number,
      balance: this.props.balance,
    }
  }
}
