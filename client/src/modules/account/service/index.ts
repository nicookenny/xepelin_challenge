/** @format */

import { api } from '../../api/api'
import { CreateAccountDTO } from '../models'
import { AccountRepository, IAccountRepository } from '../repository'

export class AccountService {
  constructor(private readonly repository: IAccountRepository) {}

  async create(dto: CreateAccountDTO) {
    const response = await this.repository.create(dto)
    return response
  }

  async getDetails(id: string) {
    const response = await this.repository.getDetails(id)
    return response
  }
}

const repository = new AccountRepository(api)
const service = new AccountService(repository)

export { service as accountService }
