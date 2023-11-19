/** @format */

import * as bcrypt from 'bcrypt'
import { ValueObject } from '../../../../shared/domain/ValueObject'
import { Result } from '../../../../shared/core/Result'

export interface PasswordProps {
  value: string
  hashed?: boolean
}

export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value
  }

  private constructor(props: PasswordProps) {
    super(props)
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string

    if (this.isAlreadyHashed()) {
      hashed = this.props.value
      return this.compare(plainTextPassword, hashed)
    } else {
      return this.props.value === plainTextPassword
    }
  }

  private compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed)
  }

  public isAlreadyHashed(): boolean {
    return !!this.props.hashed
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10)
  }

  public getHashedValue(): string {
    const isAlreadyHashed = this.isAlreadyHashed()

    return isAlreadyHashed
      ? this.props.value
      : this.hashPassword(this.props.value)
  }

  public static create(props: PasswordProps): Result<Password> {
    if (!props.value) {
      return Result.fail<Password>('La contraseña es requerida')
    }

    return Result.ok<Password>(
      new Password({
        value: props.value,
        hashed: !!props.hashed === true,
      })
    )
  }
}
