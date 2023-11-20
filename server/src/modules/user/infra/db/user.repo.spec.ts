/** @format */

import { Result } from '../../../../shared/core/Result'
import { Account } from '../../../account/domain/entities/Account'
import { Password } from '../../domain/entities/Password'
import { User } from '../../domain/entities/User'
import { UserRepository } from './user.repo'

const repo = new UserRepository()
const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
})

const account = Account.create({
  name: 'test',
  number: 123456789,
  balance: 0,
  userId: user.getValue()!.id.toString(),
})

describe('User Repository', () => {
  it("should return exists=false when user doesn't exist", async () => {
    const result = repo.exists(user.getValue()!.id.toString())
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBe(false)
  })

  it("should return fail when try to update user that doesn't exist", async () => {
    const result = repo.update(user.getValue()!)
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  it("should return fail when document doesn't exist", async () => {
    const result = repo.getByDocument('123456789')
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  it("should return fail when id doesn't exist", async () => {
    const result = repo.getById('123456789')
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  it('should save a user', async () => {
    const result = repo.save(user.getValue()!)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBeUndefined()

    const exists = repo.exists(user.getValue()!.document)

    expect(exists.isSuccess).toBe(true)
    expect(exists.getValue()).toBe(true)
  })

  it('should return fail when document already exists', async () => {
    const result = repo.save(user.getValue()!)
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('User already exists'))
  })

  it('should update account when user exist', async () => {
    user.getValue()!.addAccount(account.getValue()!)
    const result = repo.update(user.getValue()!)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBeUndefined()
  })

  it('should return success when user document exists', () => {
    const result = repo.getByDocument(user.getValue()!.document)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toMatchObject(user.getValue()!)
  })

  it('should return success when user id exists', () => {
    const result = repo.getById(user.getValue()!.id.toString())
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toMatchObject(user.getValue()!)
  })
})
