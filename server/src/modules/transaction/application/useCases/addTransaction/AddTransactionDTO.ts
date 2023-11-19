/** @format */

import { TransactionType } from '../../../domain/entities/Transaction'

export interface AddTransactionDTO {
  accountId: string
  amount: number
  type: TransactionType
}
