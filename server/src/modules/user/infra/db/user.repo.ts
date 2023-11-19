/** @format */

import { Result } from '../../../../shared/core/Result'
import { Password } from '../../domain/entities/Password'
import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repos/user.repo'

const users: User[] = []

export class UserRepository implements IUserRepository {
  exists(document: string): Result<boolean> {
    const exists = users.some((user) => user.document === document)

    return Result.ok<boolean>(exists)
  }

  save(user: User): Result<void> {
    const exists = this.exists(user.document)
    console.log({ exists })
    if (exists.getValue()) {
      return Result.fail<void>('User already exists')
    }

    users.push(user)

    return Result.ok<void>()
  }

  update(user: User): Result<void> {
    const exists = this.exists(user.document)

    if (!exists.getValue()) {
      return Result.fail<void>('User not found')
    }

    const index = users.findIndex((user) => user.document === user.document)
    users[index] = user

    return Result.ok<void>()
  }

  getByDocument(document: string): Result<User> {
    const user = users.find((user) => user.document === document)

    if (!user) {
      return Result.fail<User>('User not found')
    }

    return Result.ok<User>(user)
  }

  getById(id: string): Result<User> {
    const user = users.find((user) => user.id.toString() === id)

    if (!user) {
      return Result.fail<User>('User not found')
    }

    return Result.ok<User>(user)
  }
}
