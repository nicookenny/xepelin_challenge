/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Password } from '../../../domain/entities/Password'
import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../infra/db/user.repo'
import { AuthService } from '../../../services/impl/auth.service'
import { LoginUseCase } from './Login.uc'

process.env.JWT_SECRET = 'test'
const userRepository = UserRepository.getInstance()
const authService = new AuthService()
const useCase = new LoginUseCase(userRepository, authService)

const pass = Password.create({ value: '123456' }).getValue()!

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({
    value: pass.getHashedValue(),
    hashed: true,
  }).getValue()!,
})

describe('Login Use Case', () => {
  it("should wrong credentials when user doesn't exist", async () => {
    const dto = {
      document: '123456789',
      password: '123456',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(
      Result.fail('Las credenciales ingresadas son inválidas')
    )
  })

  it('should wrong credentials when password is wrong', async () => {
    userRepository.save(user.getValue()!)
    const dto = {
      document: '123456789',
      password: '1234567',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(
      Result.fail('Las credenciales ingresadas son inválidas')
    )
  })

  it('should login successfully', async () => {
    const dto = {
      document: '123456789',
      password: '123456',
    }

    const result = await useCase.exec(dto)

    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toMatchObject({
      document: user.getValue()!.document,
      id: user.getValue()!.id.toString(),
      account: {
        accountId: user.getValue()!.account?.id.toString()!,
        balance: user.getValue()!.account?.balance!,
        name: user.getValue()!.account?.name!,
        number: user.getValue()!.account?.number!,
      },
      token: expect.any(String),
    })
  })
})
