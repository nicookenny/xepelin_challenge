/** @format */

import { JWTClaims, JWTToken } from "../domain/entities/jwt"


export interface IAuthService {
  sign(props: JWTClaims): JWTToken
  decodeJWT(token: string): JWTClaims
}
