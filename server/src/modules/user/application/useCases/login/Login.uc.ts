/** @format */

import { Result } from '../../../../../shared/core/Result'
import { IUserRepository } from '../../../domain/repos/user.repo'
import { IAuthService } from '../../../services/auth.service'
import { LoginDTO } from './LoginDTO'
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService
  ) {}

  async exec(data: LoginDTO) {
    const { document, password } = data

    const userOrError = this.userRepository.getByDocument(document)

    if (userOrError.isFailure) {
      return Result.fail('Las credenciales ingresadas son inválidas')
    }

    const user = userOrError.getValue()!

    const passwordMatch = await user?.password.comparePassword(password)

    if (!passwordMatch) {
      return Result.fail('Las credenciales ingresadas son inválidas')
    }

    const token = this.authService.sign({
      document: user?.document,
      accounts: [],
      id: user?.id.toString(),
    })

    return Result.ok({ token, document: user?.document })
  }
}
