/** @format */

import { IAccount } from '../../account/models'

export interface IUser {
  id: string
  document: string
  account: IAccount | null
}

export interface LoginDTO {
  document: string
  password: string
}

export interface RegisterDTO {
  document: string
  name: string
  password: string
}
