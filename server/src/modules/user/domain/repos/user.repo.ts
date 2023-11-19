/** @format */

import { Result } from '../../../../shared/core/Result'
import { User } from '../entities/User'

export interface IUserRepository {
  exists(document: string): Result<boolean>
  save(user: User): Result<void>
  update(user: User): Result<void>
  getByDocument(document: string): Result<User>
  getById(id: string): Result<User>
}
