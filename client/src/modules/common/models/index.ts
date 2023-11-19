/** @format */

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export enum TransactionDescription {
  DEPOSIT = 'Depósito',
  WITHDRAW = 'Extracción',
}

export type TransactionDescriptionType = keyof typeof TransactionType
