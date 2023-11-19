/** @format */

import * as jwt from 'jsonwebtoken'
import { IAuthService } from '../auth.service'
import { JWTClaims, JWTToken } from '../../domain/entities/jwt'

export class AuthService implements IAuthService {
  sign(props: JWTClaims): JWTToken {
    return jwt.sign(props, process.env.JWT_SECRET!, {
      expiresIn: '6h',
    })
  }
  decodeJWT(token: JWTToken): JWTClaims {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTClaims

    return decoded
  }
}
