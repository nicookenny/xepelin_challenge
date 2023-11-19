/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../domain/entities/Account'
import { IAccountRepository } from '../../../domain/repos/account.repo'

export class GetAccountsUseCase {
  constructor(private readonly repository: IAccountRepository) {}

  async exec(): Promise<Result<Account[]>> {
    const result = this.repository.getAccounts()
    const accounts = result.getValue()!
    return Result.ok(accounts)
  }
}
