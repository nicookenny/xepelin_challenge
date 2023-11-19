/** @format */

import { Request, Response } from 'express'
import { AccountRepository } from '../../../infra/db/account.repo'
import { CreateAccountController } from './createAccount.controller'
import { CreateAccountUseCase } from './createAccount.uc'
import { UserRepository } from '../../../../user/infra/db/user.repo'

const repo = new AccountRepository()
const userRepo = new UserRepository()
const useCase = new CreateAccountUseCase(repo, userRepo)
const controller = new CreateAccountController(useCase)

describe('Create Account Controller', () => {
  it('should return 201 when account is created', async () => {
    const req = {
      body: {
        name: 'test',
        number: 123456789,
        balance: 0,
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.sendStatus).toHaveBeenCalledWith(201)
  })

  it("should return 500 when account isn't created", async () => {
    const req = {
      body: {
        name: 'test',
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Number cannot be empty',
    })
  })
})
