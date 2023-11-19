/** @format */

import { Result } from '../../../../shared/core/Result'
import { Account } from '../../domain/entities/Account'
import { IAccountRepository } from '../../domain/repos/account.repo'

const accounts: Account[] = []

export class AccountRepository implements IAccountRepository {
  exists(id: string): Result<boolean> {
    const account = accounts.find((account) => account.id.toString() === id)
    return Result.ok<boolean>(!!account)
  }

  existsByNumber(number: number): Result<boolean> {
    const account = accounts.find((account) => account.number === number)
    return Result.ok<boolean>(!!account)
  }

  save(account: Account): Result<void> {
    const exists = this.existsByNumber(account.number)

    if (exists.getValue()) {
      const index = accounts.findIndex(
        (account) => account.number === account.number
      )
      accounts[index] = account
    } else {
      accounts.push(account)
    }

    return Result.ok<void>()
  }

  getAccount(id: string): Result<Account> {
    const account = accounts.find((account) => account.id.toString() === id)

    if (!account) {
      return Result.fail<Account>('Account not found')
    }

    return Result.ok<Account>(account)
  }

  getAccounts(): Result<Account[]> {
    return Result.ok<Account[]>(accounts)
  }
}
