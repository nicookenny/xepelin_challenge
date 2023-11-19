/** @format */

import { ITransaction } from "../../transaction/models"

export interface IUser {
  id: string
  document: string
  accountId?: string
  transactions: ITransaction[]
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
