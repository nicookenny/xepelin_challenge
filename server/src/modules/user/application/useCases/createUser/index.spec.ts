/** @format */

import { createUserController, createUserUseCase } from '.'

describe('Create User Index', () => {
  it('should export controller', () => {
    expect(createUserController).toBeDefined()
  })

  it('should export use case', () => {
    expect(createUserUseCase).toBeDefined()
  })
})
