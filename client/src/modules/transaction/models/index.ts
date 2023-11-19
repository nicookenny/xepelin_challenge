/** @format */

import { TransactionType } from '../../common/models'

export interface ITransaction {
  id: string
  accountId: string
  amount: number
  type: TransactionType
  date: string
}

export interface AddTransactionDTO {
  accountId: string
  amount: number
  type: TransactionType
}

