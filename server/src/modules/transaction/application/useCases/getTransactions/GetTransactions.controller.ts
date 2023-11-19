/** @format */

import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/models/BaseController'
import { GetTransactionsUseCase } from './GetTransactions.uc'

export class GetTransactionsController extends BaseController {
  constructor(private readonly useCase: GetTransactionsUseCase) {
    super()
  }

  async exec(req: Request, res: Response) {
    const { document } = req.user as { document: string }

    const result = await this.useCase.exec(document)

    if (result.isFailure) {
      return this.fail(res, result.getErrorValue() as string)
    }

    return this.ok(res, {
      message: 'Transactions fetched successfully',
      data: result.getValue(),
    })
  }
}
