/** @format */

import { ITransaction } from '../../transaction/models'

export interface IAccount {
  name: string
  number: number
  accountId: string
  balance: number
  transactions: ITransaction[]
}

export interface CreateAccountDTO {
  name: string
  number: number
  balance: number
}
