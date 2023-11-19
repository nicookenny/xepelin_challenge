/** @format */

import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/models/BaseController'
import { CreateAccountUseCase } from './createAccount.uc'

export class CreateAccountController extends BaseController {
  constructor(private readonly useCase: CreateAccountUseCase) {
    super()
  }

  async exec(req: Request, res: Response) {
    const { id } = req.user!
    const { name, number, balance } = req.body

    const result = await this.useCase.exec({
      name,
      number,
      balance,
      userId: id,
    })

    if (result.isFailure) {
      return this.fail(res, result.getErrorValue() as string)
    }

    const account = result.getValue()!

    return this.ok(res, {
      message: 'Account created successfully',
      data: {
        id: account.toDTO().id,
      },
    })
  }
}
