/** @format */

import { Result } from '../../../../shared/core/Result'
import { Entity } from '../../../../shared/domain/Entity'
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID'
import { Account } from '../../../account/domain/entities/Account'
import { Transaction } from '../../../transaction/domain/entities/Transaction'
import { Password } from './Password'

interface UserProps {
  name: string
  document: string
  password: Password
  account?: Account
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get id(): UniqueEntityID {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get document(): string {
    return this.props.document
  }

  get password(): Password {
    return this.props.password
  }

  get account(): Account | undefined {
    return this.props.account
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    if (!props.document) {
      return Result.fail<User>('El documento no puede estar vacío')
    }

    if (!props.password) {
      return Result.fail<User>('La contraseña no puede estar vacía')
    }

    return Result.ok<User>(new User(props, id))
  }

  public addAccount(account: Account): Result<void> {
    if (this.props.account) {
      return Result.fail<void>('El usuario ya tiene una cuenta')
    }

    this.props.account = account

    return Result.ok<void>()
  }

  public addTransactionToAccount(transaction: Transaction): Result<void> {
    if (!this.props.account) {
      return Result.fail<void>(
        'No se puede agregar una transacción a una cuenta inexistente'
      )
    }

    const result = this.props.account.addTransaction(transaction)

    if (result.isFailure) {
      return Result.fail<void>(result.getErrorValue() as string)
    }

    return Result.ok<void>()
  }
}
