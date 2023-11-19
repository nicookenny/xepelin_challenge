/** @format */

import { Result } from '../../../../../shared/core/Result'
import { IUserRepository } from '../../../../user/domain/repos/user.repo'
import { Transaction } from '../../../domain/entities/Transaction'

export class GetTransactionsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async exec(document: string): Promise<Result<Transaction[]>> {
    try {
      const userOrError = this.userRepository.getByDocument(document)

      if (userOrError.isFailure) {
        return Result.fail<Transaction[]>(userOrError.getErrorValue() as string)
      }

      const user = userOrError.getValue()!

      const account = user.account

      if (!account) {
        return Result.fail<Transaction[]>('Account not found')
      }

      const transactions = account.transactions.map((transaction) =>
        transaction.toDTO()
      )

      return Result.ok<any>(transactions)
    } catch (error: any) {
      return Result.fail<Transaction[]>(error.message)
    }
  }
}
