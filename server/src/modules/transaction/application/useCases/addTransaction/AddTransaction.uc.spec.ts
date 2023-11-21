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
import { AddTransactionUseCase } from './AddTransaction.uc'

const accountRepository = AccountRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const userRepository = UserRepository.getInstance()
const useCase = new AddTransactionUseCase(
  accountRepository,
  userRepository,
  transactionRepository
)

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

describe('Add Transaction Use Case', () => {
  it("should fail when user doesn't exist", async () => {
    const dto = {
      amount: 100,
      description: 'test',
      accountId: '1',
      type: TransactionType.DEPOSIT,
    }

    const result = await useCase.exec(dto, '1')

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('El usuario que buscas no existe'))
  })

  userRepository.save(user.getValue()!)

  it("should fail when account doesn't exist", async () => {
    const dto = {
      amount: 100,
      description: 'test',
      accountId: '1',
      type: TransactionType.DEPOSIT,
    }

    const result = await useCase.exec(dto, user.getValue()!.document.toString())

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('Account not found'))
  })

  user.getValue()!.addAccount(account.getValue()!)
  userRepository.update(user.getValue()!)

  accountRepository.save(account.getValue()!)
  accountRepository.save(anotherAccount.getValue()!)

  it('should add a transaction', async () => {
    const dto = {
      amount: 100,
      description: 'test',
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.DEPOSIT,
    }

    const result = await useCase.exec(dto, user.getValue()!.document.toString())
    expect(result.isSuccess).toBe(true)
    expect(account.getValue()!.balance).toBe(100)
    expect(result.getValue()?.toDTO()).toMatchObject({
      id: expect.any(String),
      amount: dto.amount,
      type: dto.type,
    })
  })

  it("should fail when account doesn't have enough balance", async () => {
    const dto = {
      amount: 200,
      description: 'test',
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
    }

    const result = await useCase.exec(dto, user.getValue()!.document.toString())

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(
      Result.fail('No hay suficiente saldo en la cuenta')
    )
  })

  it('should fail when amount is negative', async () => {
    const dto = {
      amount: -100,
      description: 'test',
      accountId: account.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
    }

    const result = await useCase.exec(dto, user.getValue()!.document.toString())

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(
      Result.fail('El importe a retirar no puede ser negativo')
    )
  })

  it("should fail when owner of account doesn't match with user", async () => {
    const dto = {
      amount: 100,
      description: 'test',
      accountId: anotherAccount.getValue()!.id.toString(),
      type: TransactionType.WITHDRAW,
    }

    const result = await useCase.exec(dto, user.getValue()!.document.toString())

    expect(result.isFailure).toBe(true)
    expect(result).toMatchObject(Result.fail('Esta cuenta no te pertenece'))
  })
})
