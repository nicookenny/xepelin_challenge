/** @format */

import { AxiosError, AxiosInstance } from 'axios'
import { LoginDTO, RegisterDTO } from '../model'

interface IResponse {
  success: boolean
  message?: string
  data?: any
}
export interface IUserRepository {
  register(dto: RegisterDTO): Promise<IResponse>
  login(dto: LoginDTO): Promise<IResponse>
}

export class UserRepository {
  constructor(private readonly api: AxiosInstance) {}

  async register(dto: RegisterDTO): Promise<IResponse> {
    try {
      const result = await this.api.post('/users', dto)
      return {
        success: true,
        data: result.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data.message,
      }
    }
  }

  async login({ document, password }: LoginDTO): Promise<IResponse> {
    try {
      const result = await this.api.post('/users/login', {
        document,
        password,
      })
      return {
        success: true,
        data: result.data,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data.message,
      }
    }
  }
}
