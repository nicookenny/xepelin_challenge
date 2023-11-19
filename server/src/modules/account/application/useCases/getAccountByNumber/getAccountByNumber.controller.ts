/** @format */

import { Request, Response } from 'express'
import { GetAccountByNumberUseCase } from './getAccountByNumber.uc'
import { BaseController } from '../../../../../shared/infra/models/BaseController'

export class GetAccountByNumberController extends BaseController {
  constructor(private readonly useCase: GetAccountByNumberUseCase) {
    super()
  }

  public async exec(req: Request, res: Response) {
    const { id } = req.params

    const result = await this.useCase.exec(id)

    if (result.isFailure)
      return this.fail(res, result.getErrorValue() as string)
    const account = result.getValue()!
    return this.ok(res, {
      message: 'Account fetched successfully',
      data: account.toDTO(),
    })
  }
}
