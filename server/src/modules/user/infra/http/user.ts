/** @format */

import { Router } from 'express'
import { createUserController } from '../../application/useCases/createUser'
import { loginController } from '../../application/useCases/login'

const userRoutes = Router()

userRoutes.post('/', (request, response) =>
  createUserController.exec(request, response)
)

userRoutes.post('/login', (request, response) =>
  loginController.exec(request, response)
)

export { userRoutes }
