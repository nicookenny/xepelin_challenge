/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountByIdController } from './getAccountById.controller'
import { GetAccountById } from './getAccountById.uc'

const repo = new AccountRepository()

const useCase = new GetAccountById(repo)

const controller = new GetAccountByIdController(useCase)

export {
  controller as getAccountByNumberController,
  useCase as getAccountByNumberUseCase,
}
