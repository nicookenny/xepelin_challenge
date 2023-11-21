/** @format */

import { Result } from '../../../../shared/core/Result'
import { Password } from '../../domain/entities/Password'
import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repos/user.repo'

export class UserRepository implements IUserRepository {
  private static instance: UserRepository | null = null

  private users: User[] = []

  private constructor() {}

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }
    return UserRepository.instance
  }

  exists(document: string): Result<boolean> {
    const exists = this.users.some((user) => user.document === document)

    return Result.ok<boolean>(exists)
  }

  save(user: User): Result<void> {
    const exists = this.exists(user.document)
    if (exists.getValue()) {
      return Result.fail<void>('User already exists')
    }

    this.users.push(user)

    return Result.ok<void>()
  }

  update(user: User): Result<void> {
    const exists = this.exists(user.document)

    if (!exists.getValue()) {
      return Result.fail<void>('El usuario que buscas no existe')
    }

    const index = this.users.findIndex(
      (user) => user.document === user.document
    )
    this.users[index] = user

    return Result.ok<void>()
  }

  getByDocument(document: string): Result<User> {
    const user = this.users.find((user) => user.document === document)

    if (!user) {
      return Result.fail<User>('El usuario que buscas no existe')
    }

    return Result.ok<User>(user)
  }

  getById(id: string): Result<User> {
    const user = this.users.find((user) => user.id.toString() === id)

    if (!user) {
      return Result.fail<User>('El usuario que buscas no existe')
    }

    return Result.ok<User>(user)
  }
}
