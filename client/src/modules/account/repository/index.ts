/** @format */

import { AxiosInstance } from 'axios'
import { CreateAccountDTO } from '../models'

interface IResponse {
  success: boolean
  message?: string
  data?: any
}
export interface IAccountRepository {
  create(dto: CreateAccountDTO): Promise<IResponse>
  getDetails(id: string): Promise<IResponse>
}

export class AccountRepository implements IAccountRepository {
  constructor(private readonly api: AxiosInstance) {}

  async create(dto: CreateAccountDTO): Promise<IResponse> {
    try {
      const { data } = await this.api.post('/accounts', dto)
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.response.data.message }
    }
  }

  async getDetails(id: string): Promise<IResponse> {
    try {
      const { data } = await this.api.get(`/accounts/${id}`)
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.response.data.message }
    }
  }
}
