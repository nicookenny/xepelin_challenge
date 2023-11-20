/** @format */

import { getAccountByNumberController, getAccountByNumberUseCase } from '.'

describe('Get Account by Number INdex', () => {
  it('should return a controller', () => {
    expect(getAccountByNumberController).toBeDefined()
  })
  it('should return a use case', () => {
    expect(getAccountByNumberUseCase).toBeDefined()
  })
})
