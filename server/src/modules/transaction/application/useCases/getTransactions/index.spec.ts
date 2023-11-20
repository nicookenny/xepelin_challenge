/** @format */

import { getTransactionsController, getTransactionsUseCase } from '.'

describe('Get Transactions Index', () => {
  it('should export controller', () => {
    expect(getTransactionsController).toBeDefined()
  })

  it('should export use case', () => {
    expect(getTransactionsUseCase).toBeDefined()
  })
})
