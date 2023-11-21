/** @format */

import { IAccount } from '../../account/models'
import { ITransaction } from '../../transaction/models'
import { IUser } from '../model'

export const ActionTypes = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
  SET_ACCOUNT: 'SET_ACCOUNT',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  FILL_TRANSACTIONS: 'FILL_TRANSACTIONS',
}

export interface IUserAction {
  type: string
  payload?: any
}

export const setClient = (user: IUser & { account: IAccount }) => ({
  type: ActionTypes.SET_USER,
  payload: user,
})

export const clearClient = () => ({
  type: ActionTypes.CLEAR_USER,
})

export const setAccount = (account: IAccount) => ({
  type: ActionTypes.SET_ACCOUNT,
  payload: account,
})

export const fillTransactions = (transactions: ITransaction[]) => ({
  type: ActionTypes.FILL_TRANSACTIONS,
  payload: transactions,
})

export const addTransaction = (transaction: ITransaction) => ({
  type: ActionTypes.ADD_TRANSACTION,
  payload: transaction,
})
