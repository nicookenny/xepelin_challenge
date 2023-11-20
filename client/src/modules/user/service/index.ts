/** @format */

import { api } from '../../api/api'
import { LoginDTO, RegisterDTO } from '../model'
import { IUserRepository, UserRepository } from '../repository'

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async register(dto: RegisterDTO) {
    const result = await this.repository.register(dto)
    return result
  }

  async login(dto: LoginDTO) {
    const result = await this.repository.login(dto)
    if (result.success) {
      const { token } = result.data
      localStorage.setItem('token', token)
    }
    return result
  }
}

const repository = new UserRepository(api)
const service = new UserService(repository)

export { service as userService }
