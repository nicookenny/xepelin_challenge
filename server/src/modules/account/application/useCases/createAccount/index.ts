/** @format */

import { UserRepository } from '../../../../user/infra/db/user.repo'
import { AccountRepository } from '../../../infra/db/account.repo'
import { CreateAccountController } from './createAccount.controller'
import { CreateAccountUseCase } from './createAccount.uc'

const repo = AccountRepository.getInstance()
const userRepo = UserRepository.getInstance()
const useCase = new CreateAccountUseCase(repo, userRepo)
const controller = new CreateAccountController(useCase)

export {
  controller as createAccountController,
  useCase as createAccountUseCase,
}
