/** @format */

import { UserRepository } from '../../../infra/db/user.repo'
import { CreateUserController } from './CreateUser.controller'
import { CreateUserUseCase } from './CreateUser.uc'

const repo = UserRepository.getInstance()
const useCase = new CreateUserUseCase(repo)
const controller = new CreateUserController(useCase)

describe('Create User Controller', () => {
  it("should add successfully a user when it doesn't exist", async () => {
    const dto = {
      document: '12345678',
      name: 'test',
      password: '123456',
    }

    const req = {
      body: dto,
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    const result = await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      data: {
        document: '12345678',
        name: 'test',
        id: expect.any(String),
        account: undefined,
      },
    })
  })

  it('should fail when try to save same document user', async () => {
    const dto = {
      document: '12345678',
      name: 'test',
      password: '123456',
    }

    const req = {
      body: dto,
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User already exists',
    })
  })
})
