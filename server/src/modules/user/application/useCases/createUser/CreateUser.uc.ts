/** @format */

import { Result } from '../../../../../shared/core/Result'
import { Password } from '../../../domain/entities/Password'
import { User } from '../../../domain/entities/User'
import { IUserRepository } from '../../../domain/repos/user.repo'
import { CreateUserDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async exec(data: CreateUserDTO): Promise<Result<User>> {
    const passwordOrError = Password.create({ value: data.password })

    if (passwordOrError.isFailure) {
      return Result.fail<User>(passwordOrError.getErrorValue() as string)
    }

    const password: Password = passwordOrError.getValue()!

    const hashed = password.getHashedValue()

    const userOrError: Result<User> = User.create({
      password: Password.create({ value: hashed, hashed: true }).getValue()!,
      document: data.document,
      name: data.name,
    })

    if (userOrError.isFailure) {
      return Result.fail<User>(userOrError.getErrorValue() as string)
    }
    const user = userOrError.getValue() as User

    const savedOrError = this.repository.save(user)

    if (savedOrError.isFailure) {
      return Result.fail<User>(savedOrError.getErrorValue() as string)
    }

    return Result.ok<User>(user)
  }
}
