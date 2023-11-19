/** @format */

import { ITransaction } from '../../transaction/models'
import { ActionTypes, IUserAction } from './UserActions'
import { IUserState } from './UserContext'

export const UserReducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case ActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    case ActionTypes.SET_ACCOUNT_ID:
      return {
        ...state,
        user: {
          ...state.user,
          accountId: action.payload,
        },
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
          transactions: sortedTransactions,
        },
      }
    case ActionTypes.ADD_TRANSACTION:
      const updated = [...state.user!.transactions, action.payload]
      const sorted = updated.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      return {
        ...state,
        user: {
          ...state.user,
          transactions: sorted,
        },
      }
    default:
      return state
  }
}
