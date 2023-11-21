/** @format */

import { Result } from '../../../../shared/core/Result'
import { Account } from '../../domain/entities/Account'
import { IAccountRepository } from '../../domain/repos/account.repo'

export class AccountRepository implements IAccountRepository {
  private static instance: AccountRepository | null = null
  private accounts: Account[] = []

  private constructor() {}

  static getInstance(): AccountRepository {
    if (!AccountRepository.instance) {
      AccountRepository.instance = new AccountRepository()
    }
    return AccountRepository.instance
  }

  exists(id: string): Result<boolean> {
    const account = this.accounts.find(
      (account) => account.id.toString() === id
    )
    return Result.ok<boolean>(!!account)
  }

  existsByNumber(number: number): Result<boolean> {
    const account = this.accounts.find((account) => account.number === number)
    return Result.ok<boolean>(!!account)
  }

  save(account: Account): Result<void> {
    const exists = this.existsByNumber(account.number)

    if (exists.getValue()) {
      return Result.fail<void>('Account already exists')
    } else {
      this.accounts.push(account)
    }

    return Result.ok<void>()
  }

  update(account: Account) {
    const exists = this.exists(account.id.toString())

    if (!exists.getValue()) {
      return Result.fail<void>('Account does not exists')
    }

    const index = this.accounts.findIndex(
      (account) => account.id.toString() === account.id.toString()
    )

    this.accounts[index] = account

    return Result.ok<void>()
  }

  getAccount(id: string): Result<Account> {
    const account = this.accounts.find(
      (account) => account.id.toString() === id
    )

    if (!account) {
      return Result.fail<Account>('Account not found')
    }

    return Result.ok<Account>(account)
  }

  getAccounts(): Result<Account[]> {
    return Result.ok<Account[]>(this.accounts)
  }
}
