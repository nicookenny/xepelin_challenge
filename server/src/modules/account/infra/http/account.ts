/** @format */

import { Router } from 'express'
import { createAccountController } from '../../application/useCases/createAccount'
import { getAccountByNumberController } from '../../application/useCases/getAccountById'
import { getAccountsController } from '../../application/useCases/getAccounts'
import { middlewares } from '../../../../shared/infra/http'

const accountRoutes = Router()

accountRoutes.use((req, res, next) => middlewares.checkToken(req, res, next))

accountRoutes.post('/', (req, res) => createAccountController.execute(req, res))

accountRoutes.get('/:id', (req, res) =>
  getAccountByNumberController.execute(req, res)
)

export { accountRoutes }
