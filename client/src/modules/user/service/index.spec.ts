/** @format */

import { UserService } from '.'
import { api } from '../../api/api'
import { UserRepository } from '../repository'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const repository = new UserRepository(api)

const service = new UserService(repository)

describe('User Service', () => {
  it('should return success true when user is registered', async () => {
    jest.spyOn(repository, 'register').mockImplementationOnce(() =>
      Promise.resolve({
        success: true,
        data: {
          id: '1',
        },
      })
    )
    const response = await service.register({
      document: '123456789',
      name: 'Pedro',
      password: '123456',
    })

    expect(response.success).toBe(true)

    expect(response.data).toMatchObject({
      id: '1',
    })
  })

  it('should return success true when user is logged in', async () => {
    jest.spyOn(repository, 'login').mockImplementationOnce(() =>
      Promise.resolve({
        success: true,
        data: {
          token: 'token',
        },
      })
    )

    const response = await service.login({
      document: '123456789',
      password: '123456',
    })

    expect(response.success).toBe(true)
    expect(localStorage.getItem('token')).toBe('token')
  })
})
