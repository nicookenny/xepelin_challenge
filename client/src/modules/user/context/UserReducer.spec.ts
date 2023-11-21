/** @format */

import { TransactionType } from '../../common/models'
import { ITransaction } from '../../transaction/models'
import {
  setClient,
  addTransaction,
  clearClient,
  fillTransactions,
  setAccount,
} from './UserActions'
import { UserReducer } from './UserReducer'

const state = {
  user: null,
  account: null,
  dispatch: jest.fn(),
}

describe('User Reducer', () => {
  it('should return new state - setClient', () => {
    const client = {
      id: '123124',
      document: '12412',
      account: {
        name: '12412',
        number: 124125,
        balance: 1000,
        accountId: '1244',
        transactions: [],
      },
    }

    const action = setClient(client)

    const newState = UserReducer(state, action)

    expect(newState).toMatchObject({
      user: {
        id: '123124',
        document: '12412',
      },
      account: {
        name: '12412',
        number: 124125,
        balance: 1000,
        accountId: '1244',
        transactions: [],
      },
    })
  })

  it('should return new state - clearClient', () => {
    const action = clearClient()

    const newState = UserReducer(
      {
        ...state,
        user: {
          document: '123456789',
          id: 'Pedro',
        },
      },
      action
    )

    expect(newState).toMatchObject({
      user: {},
      account: null,
    })
  })

  it('should return new state - setAccount', () => {
    const account = {
      name: '12412',
      number: 124125,
      balance: 1000,
      accountId: '123123',
      transactions: [],
    }

    const action = setAccount(account)

    const newState = UserReducer(state, action)

    expect(newState).toMatchObject({
      user: {},
      account,
    })
  })

  it('should return new state - fillTransactions', () => {
    const transactions: ITransaction[] = [
      {
        amount: 100,
        type: TransactionType.DEPOSIT,
        date: new Date().toISOString(),
        accountId: '123123',
        id: '123123',
      },
      {
        amount: 100,
        type: TransactionType.DEPOSIT,
        date: new Date().toISOString(),
        accountId: '123123',
        id: '123123',
      },
    ]

    const action = fillTransactions(transactions)

    const newState = UserReducer(
      {
        ...state,
        account: {
          name: '12412',
          number: 124125,
          balance: 1000,
          accountId: '123123',
          transactions: [],
        },
      },
      action
    )

    expect(newState).toMatchObject({
      user: {},
      account: {
        name: '12412',
        number: 124125,
        balance: 1000,
        accountId: '123123',
        transactions,
      },
    })
  })

  it('should add transaction', () => {
    const transaction = {
      amount: 100,
      type: TransactionType.DEPOSIT,
      date: new Date().toISOString(),
      accountId: '123123',
      id: '123123',
    }

    const action = addTransaction(transaction)

    const newState = UserReducer(
      {
        ...state,
        account: {
          name: '12412',
          number: 124125,
          balance: 1000,
          accountId: '123123',
          transactions: [],
        },
      },
      action
    )

    expect(newState).toMatchObject({
      user: {},
      account: {
        name: '12412',
        number: 124125,
        balance: 1100,
        accountId: '123123',
        transactions: [transaction],
      },
    })
  })

  it("should return same state when action doesn't exists", () => {
    const action = {
      type: 'NOT_EXISTS',
    }

    const newState = UserReducer(state, action)

    expect(newState).toMatchObject(state)
  })
})
