/** @format */

import { IUser } from '../model'

export const ActionTypes = {
  SET_CLIENT: 'SET_CLIENT',
  CLEAR_CLIENT: 'CLEAR_CLIENT',
}

export interface IUserAction {
  type: string
  payload?: any
}

export const setClient = (user: IUser) => ({
  type: ActionTypes.SET_CLIENT,
  payload: user,
})

export const clearClient = () => ({
  type: ActionTypes.CLEAR_CLIENT,
})
