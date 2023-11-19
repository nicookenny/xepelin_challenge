/** @format */

import { Router } from 'express'
import { addTransactionController } from '../../application/useCases/addTransaction'
import { middlewares } from '../../../../shared/infra/http'
import { getTransactionsController } from '../../application/useCases/getTransactions'

const transactionRoutes = Router()

transactionRoutes.get(
  '/',
  (req, res, next) => middlewares.checkToken(req, res, next),
  (req, res) => getTransactionsController.exec(req, res)
)
transactionRoutes.post(
  '/',
  (req, res, next) => middlewares.checkToken(req, res, next),
  (req, res) => addTransactionController.exec(req, res)
)

export { transactionRoutes }
