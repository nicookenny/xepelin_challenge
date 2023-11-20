/** @format */

import { createAccountController, createAccountUseCase } from '.'

describe('Create Account Index', () => {
  it('should return a controller', () => {
    expect(createAccountController).toBeDefined()
  })

  it('should return a use case', () => {
    expect(createAccountUseCase).toBeDefined()
  })
})
