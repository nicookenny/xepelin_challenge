/** @format */

import { UserRepository } from '../../../../user/infra/db/user.repo'
import { GetTransactionsController } from './GetTransactions.controller'
import { GetTransactionsUseCase } from './GetTransactions.uc'

const userRepository = UserRepository.getInstance()
const useCase = new GetTransactionsUseCase(userRepository)
const controller = new GetTransactionsController(useCase)

export {
  controller as getTransactionsController,
  useCase as getTransactionsUseCase,
}
