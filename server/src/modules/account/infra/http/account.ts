/** @format */

import { Router } from 'express'
import { createAccountController } from '../../application/useCases/createAccount'
import { getAccountByNumberController } from '../../application/useCases/getAccountByNumber'
import { getAccountsController } from '../../application/useCases/getAccounts'
import { middlewares } from '../../../../shared/infra/http'

const accountRoutes = Router()
accountRoutes.post('/', 
(req, res, next) => middlewares.checkToken(req, res, next),
(req, res) => createAccountController.exec(req, res))
accountRoutes.get('/:id', (req, res) =>
  getAccountByNumberController.exec(req, res)
)
accountRoutes.get('/', (req, res) => getAccountsController.exec(req, res))

export { accountRoutes }
