/** @format */

import { Router } from 'express'
import { createUserController } from '../../application/useCases/createUser'
import { loginController } from '../../application/useCases/login'

const userRoutes = Router()

userRoutes.post('/', (request, response) =>
  createUserController.execute(request, response)
)

userRoutes.post('/login', (request, response) =>
  loginController.execute(request, response)
)

export { userRoutes }
