/** @format */

import { Router } from 'express'
import { addTransactionController } from '../../application/useCases/addTransaction'
import { middlewares } from '../../../../shared/infra/http'
import { getTransactionsController } from '../../application/useCases/getTransactions'

const transactionRoutes = Router()

transactionRoutes.use((req, res, next) =>
  middlewares.checkToken(req, res, next)
)

transactionRoutes.post(
  '/',
  (req, res, next) => middlewares.registerLargeAmounts(req, res, next),
  (req, res) => addTransactionController.execute(req, res)
)

export { transactionRoutes }
