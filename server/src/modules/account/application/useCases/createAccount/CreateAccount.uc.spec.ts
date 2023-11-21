/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Password } from '../../../../user/domain/entities/Password'
import { User } from '../../../../user/domain/entities/User'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import { Account } from '../../../domain/entities/Account'
import { AccountRepository } from '../../../infra/db/account.repo'
import { CreateAccountUseCase } from './createAccount.uc'

const repository = AccountRepository.getInstance()
const userRepository = UserRepository.getInstance()
const useCase = new CreateAccountUseCase(repository, userRepository)

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

describe('Create Account Use Case', () => {
  it("should fail when user doesn't exist", async () => {
    const dto = {
      name: 'test',
      number: 123456789,
      balance: 0,
      userId: '1',
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  userRepository.save(user.getValue()!)

  it('should create an account', async () => {
    const dto = {
      name: 'test',
      number: 123456789,
      balance: 0,
      userId: user.getValue()!.id.toString(),
    }

    const result = await useCase.exec(dto)
    const created = result.getValue() as Account

    expect(result.isSuccess).toBe(true)
    expect(created.name).toBe(dto.name)
    expect(created.number).toBe(dto.number)
    expect(created.balance).toBe(dto.balance)
  })

  userRepository.save(secondUser.getValue()!)

  it("should fail when account's number already exists", async () => {
    const dto = {
      name: 'test',
      number: 123456789,
      balance: 0,
      userId: secondUser.getValue()!.id.toString(),
    }

    const result = await useCase.exec(dto)

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('Account already exists'))
  })
})
