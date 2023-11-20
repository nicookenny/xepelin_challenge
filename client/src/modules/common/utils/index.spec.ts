/** @format */

import { formatAmount, formatDate } from '.'

describe('formatAmount', () => {
  it('should format amount with 2 decimals', () => {
    const amount = 1000
    expect(formatAmount(amount)).toMatch(/1\.000,00/)
  })

  it('should format amount with 2 decimals when amount is a string', () => {
    const amount = '1000'
    expect(formatAmount(+amount)).toMatch(/1\.000,00/)
  })
})

describe('formatDate', () => {
  it('should format date', () => {
    expect(formatDate('2021-01-01T12:10:10.000Z')).toMatch(/01\/01\/2021/)
  })
})
