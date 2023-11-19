/** @format */

import { Result } from '../../../../shared/core/Result'
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID'
import { Account } from '../entities/Account'

export interface IAccountRepository {
  exists(id: string): Result<boolean>
  existsByNumber(number: number): Result<boolean>
  save(account: Account): Result<void>
  getAccount(id: string): Result<Account>
  getAccounts(): Result<Account[]>
}
