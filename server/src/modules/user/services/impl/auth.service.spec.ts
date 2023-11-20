/** @format */

import { AuthService } from './auth.service'

const service = new AuthService()

process.env.JWT_SECRET = 'secret'
describe('Auth Service', () => {
  it("should return a token when it's signed", () => {
    const token = service.sign({
      id: '1',
      account: {
        accountId: '1',
        number: 123456,
        balance: 0,
        name: 'Pedro',
      },
      document: '123456789',
    })

    expect(token).toBeDefined()
  })

  it("should decode a token when it's verified", () => {
    const token = service.sign({
      id: '1',
      account: {
        accountId: '1',
        number: 123456,
        balance: 0,
        name: 'Pedro',
      },
      document: '123456789',
    })

    expect(token).toBeDefined()

    const decoded = service.decodeJWT(token)

    expect(decoded).toBeDefined()
    expect(decoded).toMatchObject({
      id: '1',
      account: {
        accountId: '1',
        number: 123456,
        balance: 0,
        name: 'Pedro',
      },
      document: '123456789',
    })
  })
})
