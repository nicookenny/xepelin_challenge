/** @format */

import { render } from '@testing-library/react'
import TransactionList from './TransactionList'
import { useUserContext } from '../../../user/context/UserContext'
import { IAccount } from '../../../account/models'
import { userEvent } from '@testing-library/user-event'

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))
jest.mock('../../../user/context/UserContext')

const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

describe('TransactionList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render empty table when transactions is empty', () => {
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: null,
      account: {
        transactions: [],
      } as any as IAccount,
    })

    const { getByText } = render(<TransactionList />)

    expect(getByText('Lista de transacciones')).toBeDefined()
  })

  it("should render table with transactions when transactions isn't empty", async () => {
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: null,
      account: {
        transactions: [
          {
            transactionId: '1',
            amount: 100,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 200,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 300,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 400,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 500,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 600,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 700,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 800,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 900,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 1000,
            date: new Date(),
            type: 'deposit',
          },
          {
            transactionId: '1',
            amount: 1100,
            date: new Date(),
            type: 'deposit',
          },
        ],
      } as any as IAccount,
    })

    const { getByText, getAllByText, getByLabelText } = render(
      <TransactionList />
    )

    expect(getByText('Lista de transacciones')).toBeDefined()
    expect(getByText('US$ 500,00')).toBeDefined()
    expect(getAllByText('Depósito')).toBeDefined()

    const nextButton = getByLabelText('Go to next page')

    await userEvent.click(nextButton)
    await userEvent.click(nextButton)

    expect(getByText('US$ 1.100,00')).toBeDefined()
  })
})
