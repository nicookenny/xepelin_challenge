/** @format */

import { UserRepository } from '../../../infra/db/user.repo'
import { CreateUserController } from './CreateUser.controller'
import { CreateUserUseCase } from './CreateUser.uc'

const repo = new UserRepository()
const useCase = new CreateUserUseCase(repo)
const controller = new CreateUserController(useCase)

export { controller as createUserController, useCase as createUserUseCase }
