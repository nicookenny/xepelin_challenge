/** @format */

import { AxiosInstance } from 'axios'
import { AddTransactionDTO } from '../models'

interface IResponse {
  success: boolean
  message?: string
  data?: any
}

export interface ITransactionRepository {
  addTransaction: (data: AddTransactionDTO) => Promise<IResponse>
}
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly api: AxiosInstance) {}

  async addTransaction(dto: AddTransactionDTO): Promise<IResponse> {
    try {
      const { data } = await this.api.post('/transactions', dto)
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.response.data.message }
    }
  }
}
