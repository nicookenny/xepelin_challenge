/** @format */

import { GetAccountByIdUseCase } from './getAccountById.uc'
import { AccountRepository } from '../../../infra/db/account.repo'
import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../domain/entities/Account'

const repository = AccountRepository.getInstance()
const useCase = new GetAccountByIdUseCase(repository)

describe('Get Account By Id Use Case', () => {
  it("should fail when account doesn't exist", async () => {
    const result = await useCase.exec('1')
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('Account not found'))
  })
  it('should get an account', async () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    }).getValue()!

    const accountCreated = repository.save(account)

    const result = await useCase.exec(account.id.toString())
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toMatchObject(account)
  })
})
