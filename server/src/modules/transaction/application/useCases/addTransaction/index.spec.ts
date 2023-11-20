/** @format */

import { addTransactionController, addTransactionUseCase } from '.'

describe('Add Transaction Index', () => {
  it('should export controller', () => {
    expect(addTransactionController).toBeDefined()
  })

  it('should export use case', () => {
    expect(addTransactionUseCase).toBeDefined()
  })
})
