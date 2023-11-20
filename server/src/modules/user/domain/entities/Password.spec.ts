/** @format */

import { Password } from './Password'

describe('Password', () => {
  it('should create a password', () => {
    const password = Password.create({ value: '123456' }).getValue()!

    expect(password.isAlreadyHashed()).toBe(false)
    expect(password.value).toBe('123456')
  })

  it('should create a hashed password', () => {
    const password = Password.create({
      value: '123456',
      hashed: true,
    }).getValue()!

    expect(password.isAlreadyHashed()).toBe(true)
    expect(password.value).toBe('123456')
  })

  it('should compare a plain text password', async () => {
    const password = Password.create({ value: '123456' }).getValue()!

    const result = await password.comparePassword('123456')

    expect(result).toBe(true)
  })

  it('should compare a hashed password', async () => {
    const password = Password.create({
      value: '123456',
      hashed: false,
    }).getValue()!

    const passwordHashed = Password.create({
      value: password.getHashedValue(),
      hashed: true,
    }).getValue()!

    const result = await passwordHashed.comparePassword('123456')

    expect(result).toBe(true)
    expect(passwordHashed.isAlreadyHashed()).toBe(true)
  })

  it('should fail when password is empty', () => {
    const password = Password.create({ value: '' })

    expect(password.isFailure).toBe(true)
    expect(password).toMatchObject({
      error: 'La contraseña es requerida',
    })
  })
})
