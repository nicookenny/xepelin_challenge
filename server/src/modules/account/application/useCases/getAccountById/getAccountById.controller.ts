/** @format */

import { Request, Response } from 'express'
import { GetAccountByIdUseCase } from './getAccountById.uc'
import { BaseController } from '../../../../../shared/infra/models/BaseController'

export class GetAccountByIdController extends BaseController {
  constructor(private readonly useCase: GetAccountByIdUseCase) {
    super()
  }

  public async exec(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.useCase.exec(id)

    if (result.isFailure)
      return this.notFound(res, result.getErrorValue() as string)
    const account = result.getValue()!
    return this.ok(res, {
      message: 'Account fetched successfully',
      data: account.toDTO(),
    })
  }
}
