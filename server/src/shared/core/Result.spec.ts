/** @format */

import { Result } from './Result'

describe('Result', () => {
  it('should create a success result', () => {
    const result = Result.ok('test')
    expect(result.isSuccess).toBe(true)
    expect(result.isFailure).toBe(false)
    expect(result.getValue()).toBe('test')
  })

  it('should create a failure result', () => {
    const result = Result.fail('test')
    expect(result.isSuccess).toBe(false)
    expect(result.isFailure).toBe(true)
    expect(result.getErrorValue()).toBe('test')
  })

  it('should throw when isFailure and try to get value', () => {
    const result = Result.fail('test')
    expect(() => result.getValue()).toThrow()
  })

  it("should return one failuer with errors concatenated when it's a failure", () => {
    const result = Result.combine([Result.fail('test'), Result.fail('test2')])

    expect(result.isFailure).toBe(true)
    expect(result.getErrorValue()).toBe('test - test2')
  })

  it('should return success void when no errors are combined', () => {
    const result = Result.combine([Result.ok(), Result.ok()])
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toBeUndefined()
  })
})
