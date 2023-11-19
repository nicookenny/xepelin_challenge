/** @format */

export interface IUser {
  id: string
  document: string
}

export interface LoginDTO {
  document: string
  password: string
}

export interface RegisterDTO {
  document: string
  name: string
  password: string
}
