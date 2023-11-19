/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountsController } from './getAccounts.controller'
import { GetAccountsUseCase } from './getAccounts.uc'

const repo = new AccountRepository()

const useCase = new GetAccountsUseCase(repo)

const controller = new GetAccountsController(useCase)

export { controller as getAccountsController, useCase as getAccountsUseCase }
