/** @format */

import { Request, Response } from 'express'
import { BaseController } from '../../../../../shared/infra/models/BaseController'
import { AddTransactionDTO } from './AddTransactionDTO'
import { AddTransactionUseCase } from './AddTransaction.uc'

export class AddTransactionController extends BaseController {
  constructor(private readonly useCase: AddTransactionUseCase) {
    super()
  }

  async exec(req: Request, res: Response) {
    const { document } = req.user as { document: string }

    const dto: AddTransactionDTO = req.body as AddTransactionDTO

    const result = await this.useCase.exec(dto, document)

    if (result.isFailure) {
      return this.fail(res, result.getErrorValue() as string)
    }

    return this.ok(res, {
      message: 'Transaction added successfully',
      data: result.getValue()?.toDTO(),
    })
  }
}
