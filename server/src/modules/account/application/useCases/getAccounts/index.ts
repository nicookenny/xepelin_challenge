/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountsController } from './getAccounts.controller'
import { GetAccountsUseCase } from './getAccounts.uc'

const repo = AccountRepository.getInstance()

const useCase = new GetAccountsUseCase(repo)

const controller = new GetAccountsController(useCase)

export { controller as getAccountsController, useCase as getAccountsUseCase }
