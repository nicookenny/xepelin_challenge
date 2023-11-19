/** @format */

import { NextFunction, Request, Response } from 'express'
import { IAuthService } from '../../../../modules/user/services/auth.service'
import { TransactionType } from '../../../../modules/transaction/domain/entities/Transaction'

export class Middlewares {
  constructor(private readonly authService: IAuthService) {}

  private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
    return res.status(status).send({ message })
  }

  public async checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return this.endRequest(403, 'No se envió el token', res)
    }

    const decoded = this.authService.decodeJWT(token)

    if (!decoded) {
      return this.endRequest(403, 'Token inválido', res)
    }
    req.user = decoded
    next()
  }
  public async registerLargeAmounts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { amount, type } = req.body

    if (+amount > 10000 && type === TransactionType.DEPOSIT) {
      console.log('Se registró una transacción cun un importe mayor a $10.000')
    }

    next()
  }
}
