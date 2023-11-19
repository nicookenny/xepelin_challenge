/** @format */

import express, { Router } from 'express'
import { accountRoutes } from '../../../../modules/account/infra/http/account'
import { userRoutes } from '../../../../modules/user/infra/http/user'
import { transactionRoutes } from '../../../../modules/transaction/infra/http/transaction'

const router = Router()

router.use('/accounts', accountRoutes)
router.use('/users', userRoutes)
router.use('/transactions', transactionRoutes)

export { router }
