/** @format */

import { Result } from '../../../../shared/core/Result'
import { Entity } from '../../../../shared/domain/Entity'
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID'

interface TransactionProps {
  amount: number
  date: Date
  type: TransactionType
  accountId: string
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export class Transaction extends Entity<TransactionProps> {
  constructor(props: TransactionProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get amount(): number {
    return this.props.amount
  }

  get date(): Date {
    return this.props.date
  }

  get type(): TransactionType {
    return this.props.type
  }

  get accountId(): string {
    return this.props.accountId
  }

  public static create(
    { amount, date, type, accountId }: TransactionProps,
    id?: UniqueEntityID
  ): Result<Transaction> {
    if (amount < 0) {
      return Result.fail<Transaction>(
        'El importe a retirar no puede ser negativo'
      )
    }

    return Result.ok(new Transaction({ amount, date, type, accountId }, id))
  }

  public toDTO() {
    return {
      amount: this.amount,
      date: this.date,
      type: this.type,
      account: this.accountId,
      id: this._id.toString(),
    }
  }
}
