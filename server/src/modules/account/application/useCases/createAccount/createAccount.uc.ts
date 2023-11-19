/** @format */

import { Result } from '../../../../../shared/core/Result'
import { IUserRepository } from '../../../../user/domain/repos/user.repo'
import { Account } from '../../../domain/entities/Account'
import { IAccountRepository } from '../../../domain/repos/account.repo'
import { CreateAccountDTO } from './CreateAccountDTO'

export class CreateAccountUseCase {
  constructor(
    private readonly repository: IAccountRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async exec(data: CreateAccountDTO): Promise<Result<Account>> {
    const { name, number, balance, userId } = data

    const userOrError = this.userRepository.getById(userId)

    if (userOrError.isFailure) {
      return Result.fail<Account>(userOrError.getErrorValue() as string)
    }

    const user = userOrError.getValue()!

    const accountExists = this.repository.existsByNumber(number)

    if (accountExists.isFailure) {
      return Result.fail<Account>(
        accountExists.getErrorValue() as unknown as string
      )
    }

    const account = Account.create({
      name,
      number,
      userId,
      balance: balance || 0,
    })

    if (account.isFailure) {
      return Result.fail<Account>(account.getErrorValue() as unknown as string)
    }
    const accountSaved = account.getValue() as Account

    const accountToUser = user.addAccount(accountSaved)

    if (accountToUser.isFailure) {
      return Result.fail<Account>(accountToUser.getErrorValue() as string)
    }

    const updatedUserResult = this.userRepository.update(user)

    if (updatedUserResult.isFailure) {
      return Result.fail<Account>(updatedUserResult.getErrorValue() as string)
    }

    const result = this.repository.save(accountSaved)

    if (result.isFailure) {
      return Result.fail<Account>(result.getErrorValue() as string)
    }

    return Result.ok<Account>(accountSaved)
  }
}
