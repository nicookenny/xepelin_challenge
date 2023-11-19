/** @format */

import { Result } from '../../../../../shared/core/Result'
import { IAccountRepository } from '../../../../account/domain/repos/account.repo'
import { IUserRepository } from '../../../../user/domain/repos/user.repo'
import { Transaction } from '../../../domain/entities/Transaction'
import { AddTransactionDTO } from './AddTransactionDTO'

export class AddTransactionUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async exec(
    data: AddTransactionDTO,
    document: string
  ): Promise<Result<Transaction>> {
    const { type, amount, accountId } = data

    const userOrError = this.userRepository.getByDocument(document)

    if (userOrError.isFailure) {
      return Result.fail<Transaction>(userOrError.getErrorValue() as string)
    }

    const user = userOrError.getValue()!
    const accountOrError = this.accountRepository.getAccount(accountId)

    if (accountOrError.isFailure) {
      return Result.fail<Transaction>(accountOrError.getErrorValue() as string)
    }

    const account = accountOrError.getValue()!

    const isOwner = user.id.toString() === account.ownerId

    if (!isOwner) {
      return Result.fail<Transaction>('Esta cuenta no te pertenece')
    }

    const transactionOrError = Transaction.create({
      type,
      amount,
      date: new Date(),
      accountId,
    })

    if (transactionOrError.isFailure) {
      return Result.fail<Transaction>(
        transactionOrError.getErrorValue() as string
      )
    }

    const transaction = transactionOrError.getValue()!

    const result = user.addTransactionToAccount(transaction)

    if (result.isFailure) {
      return Result.fail<Transaction>(result.getErrorValue() as string)
    }

    return Result.ok<Transaction>(transaction)
  }
}
