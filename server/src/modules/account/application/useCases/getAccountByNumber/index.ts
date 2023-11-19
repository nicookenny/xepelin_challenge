/** @format */

import { AccountRepository } from '../../../infra/db/account.repo'
import { GetAccountByNumberController } from './getAccountByNumber.controller'
import { GetAccountByNumberUseCase } from './getAccountByNumber.uc'

const repo = new AccountRepository()

const useCase = new GetAccountByNumberUseCase(repo)

const controller = new GetAccountByNumberController(useCase)

export { controller as getAccountByNumberController, useCase as getAccountByNumberUseCase }
