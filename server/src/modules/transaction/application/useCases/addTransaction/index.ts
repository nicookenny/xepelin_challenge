/** @format */

import { AccountRepository } from '../../../../account/infra/db/account.repo'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import { AddTransactionController } from './AddTransaction.controller'
import { AddTransactionUseCase } from './AddTransaction.uc'

const userRepository = new UserRepository()
const accountRepository = new AccountRepository()

const useCase = new AddTransactionUseCase(accountRepository, userRepository)
const controller = new AddTransactionController(useCase)

export {
  controller as addTransactionController,
  useCase as addTransactionUseCase,
}
