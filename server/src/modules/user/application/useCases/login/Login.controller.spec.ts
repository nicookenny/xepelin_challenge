/** @format */

import { Password } from '../../../domain/entities/Password'
import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../infra/db/user.repo'
import { AuthService } from '../../../services/impl/auth.service'
import { LoginController } from './Login.controller'
import { LoginUseCase } from './Login.uc'
process.env.JWT_SECRET = 'test'

const userRepository = new UserRepository()
const authService = new AuthService()
const useCase = new LoginUseCase(userRepository, authService)
const controller = new LoginController(useCase)

const pass = Password.create({ value: '123456' }).getValue()!

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({
    value: pass.getHashedValue(),
    hashed: true,
  }).getValue()!,
})

describe('Login Controller', () => {
  it("should return 403 when user doesn't exist", async () => {
    const req = {
      body: {
        document: '123456789',
        password: '123456',
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
      message: 'Las credenciales ingresadas son inválidas',
    })
  })
  it('should return 200 when user is logged in', async () => {
    userRepository.save(user.getValue()!)
    const req = {
      body: {
        document: '123456789',
        password: '123456',
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
      token: expect.any(String),
      document: '123456789',
      id: user.getValue()!.id.toString(),
      account: {
        accountId: undefined,
        balance: undefined,
        name: undefined,
        number: undefined,
      },
    })
  })
})
