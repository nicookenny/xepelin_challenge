/** @format */

import { UserRepository } from '../../../infra/db/user.repo'
import { AuthService } from '../../../services/impl/auth.service'
import { LoginController } from './Login.controller'
import { LoginUseCase } from './Login.uc'

const auth = new AuthService()
const repo = new UserRepository()
const useCase = new LoginUseCase(repo, auth)
const controller = new LoginController(useCase)

export { controller as loginController, useCase as loginUseCase }
