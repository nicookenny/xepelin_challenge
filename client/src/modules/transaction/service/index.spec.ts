/** @format */

import { TransactionService } from '.'
import { api } from '../../api/api'
import { TransactionType } from '../../common/models'
import { TransactionRepository } from '../repository'

jest.mock('../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const repo = new TransactionRepository(api)
const service = new TransactionService(repo)

describe('Transaction Service', () => {
  it('should return success=true and transaction info when transaction is added', async () => {
    jest.spyOn(repo, 'addTransaction').mockResolvedValue({
      success: true,
      data: {
        amount: 11000,
        date: '2023-11-19T20:44:12.676Z',
        type: 'deposit',
        account: '5ac8ea12-ec59-4135-b147-ed6534eee659',
        id: '39e860a0-b3c5-4aad-b4c1-bd9caafdb468',
      },
    })
    const dto = {
      accountId: '1',
      amount: 100,
      type: TransactionType.DEPOSIT,
    }
    const result = await service.addTransaction(dto)

    expect(result.success).toBe(true)
    expect(result.data).toMatchObject({
      amount: 11000,
      date: '2023-11-19T20:44:12.676Z',
      type: 'deposit',
      account: '5ac8ea12-ec59-4135-b147-ed6534eee659',
      id: '39e860a0-b3c5-4aad-b4c1-bd9caafdb468',
    })
  })

  it("should return success=false and error message when transaction isn't added", async () => {
    jest.spyOn(repo, 'addTransaction').mockResolvedValue({
      success: false,
      message: 'Account not found',
    })
    const dto = {
      accountId: '1',
      amount: 100,
      type: TransactionType.DEPOSIT,
    }
    const result = await service.addTransaction(dto)

    expect(result.success).toBe(false)
    expect(result.message).toBe('Account not found')
  })
})
