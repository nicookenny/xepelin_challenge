/** @format */

import { Result } from '../../../../../shared/core/Result'
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID'
import { Password } from '../../../domain/entities/Password'
import { UserRepository } from '../../../infra/db/user.repo'
import { CreateUserUseCase } from './CreateUser.uc'

const userRepository = new UserRepository()
const useCase = new CreateUserUseCase(userRepository)

describe('Create User Use Case', () => {
  it('should fail when password is empty', async () => {
    const dto = {
      document: '123456789',
      name: 'test',
      password: '',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('La contraseña es requerida'))
  })

  it('should fail when document is empty', async () => {
    const dto = {
      document: '',
      name: 'test',
      password: '123456',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(
      Result.fail('El documento no puede estar vacío')
    )
  })

  it("should add successfully a user when it doesn't exist", async () => {
    const dto = {
      document: '12345678',
      name: 'test',
      password: '123456',
    }

    const result = await useCase.exec(dto)

    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toMatchObject({
      document: dto.document,
      name: dto.name,
      password: expect.any(Password),
      id: expect.any(UniqueEntityID),
    })
  })

  it('should fail when try to save same document user', async () => {
    const dto = {
      document: '12345678',
      name: 'test',
      password: '123456',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)

    expect(result).toMatchObject(Result.fail('User already exists'))
  })
})
