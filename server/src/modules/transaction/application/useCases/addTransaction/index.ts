/** @format */

import { AccountRepository } from '../../../../account/infra/db/account.repo'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import { TransactionRepository } from '../../../infra/db/transaction.repo'
import { AddTransactionController } from './AddTransaction.controller'
import { AddTransactionUseCase } from './AddTransaction.uc'

const userRepository = UserRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const accountRepository = AccountRepository.getInstance()

const useCase = new AddTransactionUseCase(
  accountRepository,
  userRepository,
  transactionRepository
)

const controller = new AddTransactionController(useCase)

export {
  controller as addTransactionController,
  useCase as addTransactionUseCase,
}
