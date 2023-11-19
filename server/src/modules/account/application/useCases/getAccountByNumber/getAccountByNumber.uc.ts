/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../domain/entities/Account'
import { IAccountRepository } from '../../../domain/repos/account.repo'

export class GetAccountByNumberUseCase {
  constructor(private readonly repository: IAccountRepository) {}

  async exec(id: string): Promise<Result<Account>> {
    const result = this.repository.getAccount(id)
    if (result.isFailure) {
      return Result.fail(result.getErrorValue() as string)
    }
    const account = result.getValue()!

    return Result.ok(account)
  }
}
