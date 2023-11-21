/** @format */

import { TransactionType } from '../../common/models'
import {
  setClient,
  addTransaction,
  clearClient,
  setAccount,
  fillTransactions,
} from './UserActions'

describe('User Actions', () => {
  it('should return IUserAction - setClient', () => {
    const client = {
      id: '123124',
      document: '12412',
      account: {
        name: '12412',
        number: 124125,
        balance: 1000,
        accountId: '12312',
        transactions: [],
      },
    }

    const action = setClient(client)

    expect(action).toMatchObject({
      type: 'SET_USER',
      payload: client,
    })
  })
  it('should return IUserAction - clearClient', () => {
    const action = clearClient()

    expect(action).toMatchObject({
      type: 'CLEAR_USER',
    })
  })
  it('should return IUserAction - setAccount', () => {
    const account = {
      name: '12412',
      number: 124125,
      balance: 1000,
      accountId: '123123',
      transactions: [],
    }

    const action = setAccount(account)

    expect(action).toMatchObject({
      type: 'SET_ACCOUNT',
      payload: account,
    })
  })
  it('should return IUserAction - fillTransactions', () => {
    const transactions = [
      {
        amount: 100,
        type: TransactionType.DEPOSIT,
        date: new Date().toISOString(),
        accountId: '123123',
        id: '123123',
      },
    ]

    const action = fillTransactions(transactions)

    expect(action).toMatchObject({
      type: 'FILL_TRANSACTIONS',
      payload: transactions,
    })
  })
  it('should return IUserAction - addTransaction', () => {
    const transaction = {
      amount: 100,
      type: TransactionType.DEPOSIT,
      date: new Date().toISOString(),
      accountId: '123123',
      id: '123123',
    }

    const action = addTransaction(transaction)

    expect(action).toMatchObject({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    })
  })
})
