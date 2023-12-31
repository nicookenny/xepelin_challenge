/** @format */

import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/models/BaseController'
import { CreateUserUseCase } from './CreateUser.uc'

export class CreateUserController extends BaseController {
  constructor(private readonly useCase: CreateUserUseCase) {
    super()
  }

  async exec(req: Request, res: Response) {
    const { document, password, name } = req.body

    const result = await this.useCase.exec({ document, password, name })

    if (result.isFailure) {
      return this.fail(res, result.getErrorValue() as string)
    }

    return this.ok(res, {
      data: result.getValue()!.toDTO(),
      message: 'User created successfully',
    })
  }
}
