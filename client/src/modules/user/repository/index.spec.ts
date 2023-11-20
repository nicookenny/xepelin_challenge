/** @format */

import { UserRepository } from '.'
import { api } from '../../api/api'
import MockAdapter from 'axios-mock-adapter'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const mock = new MockAdapter(api)
const repository = new UserRepository(api)

describe('User Repository', () => {
  it('should return success true when user is registered', async () => {
    mock.onPost('/users').reply(200, {
      message: 'User created successfully',
      data: {
        id: '1',
      },
    })

    const dto = {
      document: '123456789',
      name: 'Pedro',
      password: '123456',
    }
    const result = await repository.register(dto)

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      message: 'User created successfully',
      data: {
        id: '1',
      },
    })
  })

  it("should return success false, message: 'User already exists' when user already exists", async () => {
    mock.onPost('/users').reply(500, {
      message: 'User already exists',
    })

    const dto = {
      document: '123456789',
      name: 'Pedro',
      password: '123456',
    }
    const result = await repository.register(dto)

    expect(result.success).toBe(false)
    expect(result.message).toBe('User already exists')
  })

  it('should return success true when user is logged in', async () => {
    mock.onPost('/users/login').reply(200, {
      message: 'User logged in successfully',
      data: {
        token: 'token',
      },
    })

    const dto = {
      document: '123456789',
      password: '123456',
    }
    const result = await repository.login(dto)

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      message: 'User logged in successfully',
      data: {
        token: 'token',
      },
    })
  })

  it("should return success false, message: 'User not found' when user doesn't exist", async () => {
    mock.onPost('/users/login').reply(500, {
      message: 'User not found',
    })

    const dto = {
      document: '123456789',
      password: '123456',
    }

    const result = await repository.login(dto)

    expect(result.success).toBe(false)
    expect(result.message).toBe('User not found')
  })
})
