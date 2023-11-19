/** @format */

import { api } from '../../api/api'
import { AddTransactionDTO } from '../models'
import { ITransactionRepository, TransactionRepository } from '../repository'

export class TransactionService {
  constructor(private readonly repository: ITransactionRepository) {}

  async addTransaction(data: AddTransactionDTO) {
    const response = await this.repository.addTransaction(data)
    return response
  }
}

const repository = new TransactionRepository(api)
const service = new TransactionService(repository)

export { service as transactionService }
