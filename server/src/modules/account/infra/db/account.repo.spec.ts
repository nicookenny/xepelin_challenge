/** @format */

import { AccountRepository } from './account.repo'
import { Account } from '../../domain/entities/Account'

const repository = new AccountRepository()
const data = {
  number: 123456,
  name: 'Cuenta Corriente',
  balance: 1000,
  userId: '1',
}
const account = Account.create(data).getValue()!
const anotherAccount = Account.create(data).getValue()!
describe('Account Repository', () => {
  it('should save an account', async () => {
    const result = repository.save(account)
    expect(result.isSuccess).toBe(true)
  })

  it('should get an account', async () => {
    const result = repository.getAccount(account.id.toString())
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()?.toDTO()).toMatchObject({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      transactions: [],
      id: account.id.toString(),
    })
  })

  it('should get 1 account', async () => {
    const result = repository.getAccounts()
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toHaveLength(1)
  })

  it('should return true when account exists', () => {
    const result = repository.exists(account.id.toString())
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBe(true)
  })

  it('should return void but success when account updated successfully', () => {
    account.deposit(100)
    const result = repository.update(account)

    const updated = repository.getAccount(account.id.toString())

    expect(updated.getValue()?.toDTO().balance).toBe(1100)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBeUndefined()
  })

  it("should fail when try to update an account that doesn't exists", () => {
    const result = repository.update(anotherAccount)

    expect(result.isFailure).toBe(true)
    expect(result.getErrorValue()).toBe('Account does not exists')
  })
})
