/** @format */

export interface JWTClaims {
  id: string
  document: string
  account: {
    accountId: string
    number?: number
    balance: number
    name: string
  }
}

export type JWTToken = string

export type SessionId = string

export type RefreshToken = string
