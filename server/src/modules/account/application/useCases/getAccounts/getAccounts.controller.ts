/** @format */

import { Request, Response } from 'express'
import { GetAccountsUseCase } from './getAccounts.uc'
import { BaseController } from '../../../../../shared/infra/models/BaseController'

export class GetAccountsController extends BaseController {
  constructor(private readonly useCase: GetAccountsUseCase) {
    super()
  }
  public async exec(req: Request, res: Response) {
    const result = await this.useCase.exec()

    if (result.isFailure) {
      return this.fail(res, result.getErrorValue() as string)
    }

    const accounts = result.getValue()!

    return this.ok(res, {
      message: 'Accounts fetched successfully',
      data: accounts.map((account) => account.toDTO()),
    })
  }
}
