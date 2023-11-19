/** @format */

export interface JWTClaims {
  id: string
  document: string
  accounts: string[]
}

export type JWTToken = string

export type SessionId = string

export type RefreshToken = string
