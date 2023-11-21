/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountByIdController } from './getAccountById.controller'
import { GetAccountByIdUseCase } from './getAccountById.uc'

const repo = AccountRepository.getInstance()

const useCase = new GetAccountByIdUseCase(repo)

const controller = new GetAccountByIdController(useCase)

export {
  controller as getAccountByNumberController,
  useCase as getAccountByNumberUseCase,
}
