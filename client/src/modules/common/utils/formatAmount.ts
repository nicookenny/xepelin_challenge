/** @format */

export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })
}
