/** @format */

import { Request, Response } from 'express'
import { AccountRepository } from '../../../infra/db/account.repo'
import { CreateAccountController } from './createAccount.controller'
import { CreateAccountUseCase } from './createAccount.uc'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import { Result } from '../../../../../shared/core/Result'
import { User } from '../../../../user/domain/entities/User'
import { Password } from '../../../../user/domain/entities/Password'

jest.mock('../../../../user/infra/db/user.repo')
const repo = new AccountRepository()
const userRepo = new UserRepository()
const useCase = new CreateAccountUseCase(repo, userRepo)
const controller = new CreateAccountController(useCase)

const mockUserRepo = userRepo as jest.Mocked<UserRepository>

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
})

const secondUser = User.create({
  document: '2912092',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
})

describe('Create Account Controller', () => {
  it('should return 201 when account is created', async () => {
    mockUserRepo.getById.mockImplementationOnce(() =>
      Result.ok(user.getValue()!)
    )
    mockUserRepo.update.mockImplementationOnce(() => Result.ok())
    const req = {
      user: {
        id: '1',
      },
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
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
      },
      message: 'Account created successfully',
    })
  })

  it('should return 500 when  account number already exists', async () => {
    mockUserRepo.getById.mockImplementationOnce(() =>
      Result.ok(secondUser.getValue()!)
    )

    mockUserRepo.update.mockImplementationOnce(() => Result.ok())

    const req = {
      user: {
        id: '1',
      },
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
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account already exists',
    })
  })

  it("should return 500 when account isn't created", async () => {
    mockUserRepo.getById.mockImplementationOnce(() =>
      Result.ok(user.getValue()!)
    )
    mockUserRepo.update.mockImplementationOnce(() => Result.ok())
    const req = {
      user: {
        id: '1',
      },
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
      message: 'Number cannot be empty - Number must be a number',
    })
  })
})
