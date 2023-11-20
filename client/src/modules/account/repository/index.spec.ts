/** @format */

import { AccountRepository } from '.'
import { api } from '../../api/api'
import MockAdapter from 'axios-mock-adapter'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const mock = new MockAdapter(api)

const repo = new AccountRepository(api)

localStorage.setItem('token', 'token')
describe('Account Repository', () => {
  it('should create account succesfully', async () => {
    mock.onPost('/accounts').reply(200, {
      message: 'Account created successfully',
      data: {
        id: '5ac8ea12-ec59-4135-b147-ed6534eee659',
      },
    })

    const dto = {
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
    }
    const result = await repo.create(dto)

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      message: 'Account created successfully',
      data: {
        id: '5ac8ea12-ec59-4135-b147-ed6534eee659',
      },
    })
  })

  it("should success= false, message: 'Account number already in use' when account nubmer exist", async () => {
    mock.onPost('/accounts').reply(500, {
      message: 'Account number already in use',
    })

    const dto = {
      number: 123456,
      name: 'Cuenta Corriente',
      balance: 1000,
    }
    const result = await repo.create(dto)

    expect(result.success).toBe(false)
    expect(result.message).toBe('Account number already in use')
  })

  it('should return account details succesfully when account exists', async () => {
    mock.onGet('/accounts/5ac8ea12-ec59-4135-b147-ed6534eee659').reply(200, {
      message: 'Account fetched successfully',
      data: {
        id: '5ac8ea12-ec59-4135-b147-ed6534eee659',
        name: 'Cuena Sueldo',
        owner: 'c7c595e4-d14a-4bd1-86f8-5e081f0a421a',
        number: 1239923,
        balance: 22000,
        transactions: [],
      },
    })

    const result = await repo.getDetails('5ac8ea12-ec59-4135-b147-ed6534eee659')

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      message: 'Account fetched successfully',
      data: {
        id: '5ac8ea12-ec59-4135-b147-ed6534eee659',
        name: 'Cuena Sueldo',
        owner: 'c7c595e4-d14a-4bd1-86f8-5e081f0a421a',
        number: 1239923,
        balance: 22000,
        transactions: [],
      },
    })
  })

  it("should return  success false and account not found message when account doesn't exist", async () => {
    mock.onGet('/accounts/5ac8ea12-ec59-4135-b147-ed6534eee659').reply(500, {
      message: 'Account not found',
    })

    const result = await repo.getDetails('5ac8ea12-ec59-4135-b147-ed6534eee659')

    expect(result.success).toBe(false)
    expect(result.message).toBe('Account not found')
  })
})
