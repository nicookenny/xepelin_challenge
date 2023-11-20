/** @format */

import { getAccountsController, getAccountsUseCase } from '.'

describe('Get Accounts Index', () => {
  it('should return a controller', () => {
    expect(getAccountsController).toBeDefined()
  })
  it('should return a use case', () => {
    expect(getAccountsUseCase).toBeDefined()
  })
})
