/** @format */

import { loginController, loginUseCase } from '.'

describe('Login Index', () => {
  it('should export controller', () => {
    expect(loginController).toBeDefined()
  })

  it('should export use case', () => {
    expect(loginUseCase).toBeDefined()
  })
})
