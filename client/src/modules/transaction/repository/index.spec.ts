/** @format */

import { TransactionRepository } from '.'
import { api } from '../../api/api'
import MockAdapter from 'axios-mock-adapter'
import { TransactionType } from '../../common/models'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const mock = new MockAdapter(api)
const repository = new TransactionRepository(api)

describe('Transaction Repository', () => {
  it('should return success true when transaction is added', async () => {
    mock.onPost('/transactions').reply(200, {
      message: 'Transaction added successfully',
      data: {
        id: '1',
      },
    })

    const dto = {
      accountId: '1',
      amount: 100,
      type: TransactionType.DEPOSIT,
    }
    const result = await repository.addTransaction(dto)

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      message: 'Transaction added successfully',
      data: {
        id: '1',
      },
    })
  })

  it("should return success false, message: 'Account not found' when account doesn't exist", async () => {
    mock.onPost('/transactions').reply(500, {
      message: 'Account not found',
    })

    const dto = {
      accountId: '1',
      amount: 100,
      type: TransactionType.DEPOSIT,
    }
    const result = await repository.addTransaction(dto)

    expect(result.success).toBe(false)
    expect(result.message).toBe('Account not found')
  })
})
