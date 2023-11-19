/** @format */

declare namespace Express {
  export interface Request {
    user?: {
      id: string
      document: string
      accountId?: string
    }
  }
}
