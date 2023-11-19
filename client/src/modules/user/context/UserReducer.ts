/** @format */

import { ActionTypes, IUserAction } from './UserActions'
import { IUserState } from './UserContext'

export const UserReducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case ActionTypes.SET_CLIENT:
      return {
        ...state,
        client: action.payload,
      }
    case ActionTypes.CLEAR_CLIENT:
      return {
        ...state,
        client: null,
      }
    default:
      return state
  }
}
