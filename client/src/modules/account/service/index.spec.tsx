/** @format */

import { AccountService } from '.'
import { api } from '../../api/api'
import { AccountRepository } from '../repository'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const repo = new AccountRepository(api)
const service = new AccountService(repo)

describe('AccountService', () => {
  it('should return according reponse when success on create', async () => {
    jest.spyOn(repo, 'create').mockResolvedValueOnce({
      success: true,
      data: {
        message: 'message',
        id: '1',
        name: 'name',
      },
    })

    const response = await service.create({
      name: 'name',
      number: 123,
      balance: 0,
    })

    expect(response).toEqual({
      success: true,
      data: {
        message: 'message',
        id: '1',
        name: 'name',
      },
    })
  })

  it('should return according reponse when error on create', async () => {
    jest.spyOn(repo, 'create').mockResolvedValueOnce({
      success: false,
      message: 'message',
    })

    const response = await service.create({
      name: 'name',
      number: 123,
      balance: 0,
    })

    expect(response).toEqual({
      success: false,
      message: 'message',
    })
  })

  it('should success on getting details when account exists', async () => {
    jest.spyOn(repo, 'getDetails').mockResolvedValueOnce({
      success: true,
      data: {
        id: '1',
        name: 'name',
        number: 123,
        balance: 0,
        transactions: [],
      },
    })

    const response = await service.getDetails('1')

    expect(response).toEqual({
      success: true,
      data: {
        id: '1',
        name: 'name',
        number: 123,
        balance: 0,
        transactions: [],
      },
    })
  })

  it('should fail on getting details when account does not exists', async () => {
    jest.spyOn(repo, 'getDetails').mockResolvedValueOnce({
      success: false,
      message: 'message',
    })

    const response = await service.getDetails('1')

    expect(response).toEqual({
      success: false,
      message: 'message',
    })
  })
})
