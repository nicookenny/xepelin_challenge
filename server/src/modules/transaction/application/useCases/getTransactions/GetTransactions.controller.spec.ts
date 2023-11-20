/** @format */

import { Account } from '../../../../account/domain/entities/Account'
import { Password } from '../../../../user/domain/entities/Password'
import { User } from '../../../../user/domain/entities/User'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import {
  Transaction,
  TransactionType,
} from '../../../domain/entities/Transaction'
import { GetTransactionsController } from './GetTransactions.controller'
import { GetTransactionsUseCase } from './GetTransactions.uc'

const userRepository = new UserRepository()
const useCase = new GetTransactionsUseCase(userRepository)
const controller = new GetTransactionsController(useCase)

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
}).getValue()!

const account = Account.create({
  name: 'test',
  number: 123456789,
  balance: 0,
  userId: user.id.toString(),
})

const transaction = Transaction.create({
  amount: 100,
  accountId: account.getValue()!.id.toString(),
  type: TransactionType.DEPOSIT,
  date: new Date(),
})

describe('Get Transactions Controller', () => {
  it('should return failure when user doesnt exist', async () => {
    const req = {
      user: {
        document: '123456789',
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'El usuario que buscas no existe',
    })
  })

  it("should fail when user exists but doesn't have accounts", async () => {
    userRepository.save(user)

    const req = {
      user: {
        document: '123456789',
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Account not found',
    })
  })

  it('should get 1 transaction', async () => {
    user.addAccount(account.getValue()!)
    userRepository.update(user)
    account.getValue()!.addTransaction(transaction.getValue()!)
    const req = {
      user: {
        document: '123456789',
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)
    expect(res.json).toHaveBeenCalledWith({
      data: [transaction.getValue()!.toDTO()],
      message: 'Transactions fetched successfully',
    })
    expect(res.status).toHaveBeenCalledWith(200)
  })
})
