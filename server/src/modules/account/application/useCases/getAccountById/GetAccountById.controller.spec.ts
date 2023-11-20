/** @format */

import { Account } from '../../../domain/entities/Account'
import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountByIdController } from './getAccountById.controller'
import { GetAccountByIdUseCase } from './getAccountById.uc'

const repo = new AccountRepository()
const useCase = new GetAccountByIdUseCase(repo)
const controller = new GetAccountByIdController(useCase)
describe('Get Account By Id Controller', () => {
  it("should fail when account doesn't exist", async () => {
    const req = {
      params: {
        id: '1',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }
    await controller.exec(req as any, res as any)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account not found',
    })
  })

  it('should response 200 and get an account', async () => {
    const account = Account.create({
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
      userId: '1',
    }).getValue()!

    repo.save(account)

    const req = {
      params: {
        id: account.id.toString(),
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account fetched successfully',
      data: account.toDTO(),
    })
  })
})
