/** @format */

import { TransactionType } from '../../common/models'
import { ITransaction } from '../../transaction/models'
import { ActionTypes, IUserAction } from './UserActions'
import { IUserState } from './UserContext'

export const UserReducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      const { account, ...user } = action.payload
      return {
        ...state,
        user,
        account,
      }
    case ActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
        account: null,
      }
    case ActionTypes.SET_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
        },
        account: action.payload,
      }
    case ActionTypes.FILL_TRANSACTIONS:
      const sortedTransactions = action.payload.sort(
        (a: ITransaction, b: ITransaction) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
      )
      return {
        ...state,
        user: {
          ...state.user,
        },
        account: {
          ...state.account,
          transactions: sortedTransactions,
        },
      }
    case ActionTypes.ADD_TRANSACTION:
      const type = action.payload.type
      const amount =
        type === TransactionType.DEPOSIT
          ? action.payload.amount
          : -action.payload.amount
      return {
        ...state,
        account: {
          ...state.account,
          balance: state.account!.balance + amount,
          transactions: [action.payload, ...state.account!.transactions],
        },
      }
    default:
      return state
  }
}
