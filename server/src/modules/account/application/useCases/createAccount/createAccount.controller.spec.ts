/** @format */

import { Request, Response } from 'express'
import { AccountRepository } from '../../../infra/db/account.repo'
import { CreateAccountController } from './createAccount.controller'
import { CreateAccountUseCase } from './createAccount.uc'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import { Result } from '../../../../../shared/core/Result'
import { User } from '../../../../user/domain/entities/User'
import { Password } from '../../../../user/domain/entities/Password'

const repo = AccountRepository.getInstance()
const userRepo = UserRepository.getInstance()
const useCase = new CreateAccountUseCase(repo, userRepo)
const controller = new CreateAccountController(useCase)

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
  userRepo.save(user.getValue()!)
  it('should return 201 when account is created', async () => {
    const req = {
      user: {
        document: user.getValue()!.document,
        id: user.getValue()!.id.toString()
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
    const req = {
      user: {
        document: user.getValue()!.document,
        id: user.getValue()!.id.toString()
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
      message: 'El usuario ya tiene una cuenta',
    })
  })

  it("should return 500 when account isn't created", async () => {
    const req = {
      user: {
        document: user.getValue()!.document,
        id: user.getValue()!.id.toString()
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
