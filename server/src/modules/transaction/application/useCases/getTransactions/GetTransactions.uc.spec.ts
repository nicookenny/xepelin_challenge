/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Account } from '../../../../account/domain/entities/Account'
import { Password } from '../../../../user/domain/entities/Password'
import { User } from '../../../../user/domain/entities/User'
import { UserRepository } from '../../../../user/infra/db/user.repo'
import {
  Transaction,
  TransactionType,
} from '../../../domain/entities/Transaction'
import { TransactionRepository } from '../../../infra/db/transaction.repo'
import { GetTransactionsUseCase } from './GetTransactions.uc'

const userRepository = UserRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const useCase = new GetTransactionsUseCase(userRepository)

const user = User.create({
  document: '123456789',
  name: 'Pedro',
  password: Password.create({ value: '123456' }).getValue()!,
})

const account = Account.create({
  name: 'test',
  number: 123456789,
  balance: 0,
  userId: user.getValue()!.id.toString(),
}).getValue()!

const transaction = Transaction.create({
  amount: 100,
  accountId: account.id.toString(),
  type: TransactionType.DEPOSIT,
  date: new Date(),
}).getValue()!

describe('Get Transactions Use Case', () => {
  it('should fail when no user exists on repository', async () => {
    const result = await useCase.exec(user.getValue()!.id.toString())
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  userRepository.save(user.getValue()!)

  it("should fail when user doesn't have any account", async () => {
    const result = await useCase.exec(user.getValue()!.document)
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('Account not found'))
  })

  it('should get 0 transactions when user has no transactions', async () => {
    user.getValue()!.addAccount(account)
    userRepository.update(user.getValue()!)
    const result = await useCase.exec(user.getValue()!.document)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toHaveLength(0)
  })

  it("should return user's transactions", async () => {
    account.addTransaction(transaction)
    transactionRepository.save(transaction)
    userRepository.update(user.getValue()!)
    const result = await useCase.exec(user.getValue()!.document)
    expect(result.isSuccess).toBe(true)
    expect(result.getValue()).toHaveLength(1)
  })

  it('should catch error when user repository throws an error', async () => {
    jest.spyOn(userRepository, 'getByDocument').mockImplementation(() => {
      throw new Error('test')
    })

    const result = await useCase.exec(user.getValue()!.document)
    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('test'))
  })
})
