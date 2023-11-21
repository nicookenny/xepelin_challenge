/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../../account/domain/entities/Account'
import { AccountRepository } from '../../../../account/infra/db/account.repo'
import { Password } from '../../../../user/domain/entities/Password'
import { User } from '../../../../user/domain/entities/User'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import {
  Transaction,
  TransactionType,
} from '../../../domain/entities/Transaction'
import { TransactionRepository } from '../../../infra/db/transaction.repo'
import { AddTransactionController } from './AddTransaction.controller'
import { AddTransactionUseCase } from './AddTransaction.uc'

const accountRepository = AccountRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const userRepository = UserRepository.getInstance()
const useCase = new AddTransactionUseCase(
  accountRepository,
  userRepository,
  transactionRepository
)
const controller = new AddTransactionController(useCase)

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
})

const account = Account.create({
  balance: 0,
  name: 'test',
  number: 123456789,
  userId: user.getValue()!.id.toString(),
})

const anotherAccount = Account.create({
  balance: 0,
  name: 'test',
  number: 122456789,
  userId: '1241412',
})

describe('Add Transaction Controller', () => {
  it('should fail when useCase fails', async () => {
    const req = {
      user: {
        id: '1',
      },
      body: {
        amount: 100,
        description: 'test',
        accountId: '1',
        type: TransactionType.DEPOSIT,
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

  userRepository.save(user.getValue()!)

  user.getValue()!.addAccount(account.getValue()!)

  accountRepository.save(account.getValue()!)
  accountRepository.save(anotherAccount.getValue()!)

  userRepository.update(user.getValue()!)

  it("should success when useCase success and it's a deposit", async () => {
    const req = {
      user: {
        document: user.getValue()!.document.toString(),
      },
      body: {
        amount: 100,
        description: 'test',
        accountId: account.getValue()!.id.toString(),
        type: TransactionType.DEPOSIT,
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
    }

    await controller.exec(req as any, res as any)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Transaction added successfully',
      data: {
        account: account.getValue()!.id.toString(),
        amount: 100,
        date: expect.any(Date),
        id: expect.any(String),
        type: 'deposit',
      },
    })
  })
})
