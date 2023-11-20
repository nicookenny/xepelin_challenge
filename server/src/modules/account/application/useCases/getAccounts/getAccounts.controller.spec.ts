/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../domain/entities/Account'
import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountsController } from './getAccounts.controller'
import { GetAccountsUseCase } from './getAccounts.uc'

const repo = new AccountRepository()
const useCase = new GetAccountsUseCase(repo)
const controller = new GetAccountsController(useCase)

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

describe('Get Accounts Controller', () => {
  it('should get 0 accounts', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }
    await controller.exec(req as any, res as any)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Accounts fetched successfully',
      data: [],
    })
  })

  it("should get 2 accounts when there're 2 accounts", async () => {
    repo.save(accounts[0])
    repo.save(accounts[1])
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Accounts fetched successfully',
      data: accounts.map((account) => account.toDTO()),
    })
  })
})
