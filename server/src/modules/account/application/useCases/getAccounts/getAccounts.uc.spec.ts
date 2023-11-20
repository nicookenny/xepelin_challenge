/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountsUseCase } from './getAccounts.uc'
import { Account } from '../../../domain/entities/Account'

const repository = new AccountRepository()
const useCase = new GetAccountsUseCase(repository)

const accounts = [
  Account.create({
    number: 123456,
    name: 'Cuenta Corriente',
    balance: 1000,
    userId: '1',
  }).getValue()!,
  Account.create({
    number: 123156,
    name: 'Cuenta Corriente',
    balance: 1000,
    userId: '2',
  }).getValue()!,
]

describe('Get Accounts Use Case', () => {
  it('should get 0 accounts', async () => {
    const result = await useCase.exec()
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toHaveLength(0)
  })

  it("should get 2 accounts when there're 2 accounts", async () => {
    repository.save(accounts[0])
    repository.save(accounts[1])

    const result = await useCase.exec()
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toHaveLength(2)
  })
})
