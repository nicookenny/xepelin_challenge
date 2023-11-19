/** @format */

import React, { useContext, createContext, useReducer, Dispatch } from 'react'
import { UserReducer } from './UserReducer'
import { IUserAction } from './UserActions'
import { IUser } from '../model'

export interface IUserState {
  user: IUser | null
  dispatch: Dispatch<IUserAction>
}

const initialState: IUserState = {
  user: null,
  dispatch: () => {},
}

const UserContext = createContext<IUserState>(initialState)

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
