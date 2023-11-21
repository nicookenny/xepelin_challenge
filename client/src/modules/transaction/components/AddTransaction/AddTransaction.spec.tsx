/** @format */

import { render, waitFor } from '@testing-library/react'
import { useUserContext } from '../../../user/context/UserContext'
import AddTransaction from './AddTransaction'
import { userEvent } from '@testing-library/user-event'
import { transactionService } from '../../service'
import { toast } from 'react-toastify'

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

jest.mock('../../../user/context/UserContext')

const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

describe('AddTransaction', () => {
  it('should render modal successfully', () => {
    mockUseUserContext.mockReturnValue({
      account: {
        accountId: '1',
        balance: 0,
        name: 'name',
        number: 123,
        transactions: [],
      },
      user: null,
      dispatch: jest.fn(),
    })

    const { getByTestId } = render(
      <AddTransaction open={true} onClose={jest.fn()} />
    )

    const button = getByTestId('submit-button')

    expect(button).toBeDefined()
  })

  it('should call transactionService.addTransaction when submit button is clicked', async () => {
    jest.spyOn(toast, 'success').mockImplementationOnce(jest.fn())
    jest.spyOn(transactionService, 'addTransaction').mockResolvedValueOnce({
      success: true,
      data: {
        data: {
          amount: 100,
          date: new Date(),
          type: 'deposit',
          id: '1241',
          accountId: '12125',
        },
      },
    })

    mockUseUserContext.mockReturnValue({
      account: {
        accountId: '1',
        balance: 0,
        name: 'name',
        number: 123,
        transactions: [],
      },
      user: null,
      dispatch: jest.fn(),
    })

    const onClose= jest.fn()
    const { getByTestId } = render(
      <AddTransaction open={true} onClose={onClose} />
    )

    const amount = getByTestId('amount-input')

    await userEvent.type(amount, '100')

    const button = getByTestId('submit-button')
    expect(button).toBeDefined()

    userEvent.click(button)

    await waitFor(() => {
      expect(transactionService.addTransaction).toHaveBeenCalledWith({
        accountId: '1',
        amount: 100,
        type: 'DEPOSIT',
      })

      expect(toast.success).toHaveBeenCalledWith(
        '¡Transacción realizada con éxito!'
      )

      expect(onClose).toHaveBeenCalled()
    })
  })

  it("should toast.error be called when transactionService.addTransaction doesn't return success", async () => {
    jest.spyOn(toast, 'error').mockImplementationOnce(jest.fn())
    jest.spyOn(transactionService, 'addTransaction').mockResolvedValueOnce({
      success: false,
      message: 'Error al crear la transaccion',
    })

    mockUseUserContext.mockReturnValue({
      account: {
        accountId: '1',
        balance: 0,
        name: 'name',
        number: 123,
        transactions: [],
      },
      user: null,
      dispatch: jest.fn(),
    })

    const { getByTestId } = render(
      <AddTransaction open={true} onClose={jest.fn()} />
    )

    const amount = getByTestId('amount-input')

    await userEvent.type(amount, '100')

    const button = getByTestId('submit-button')
    expect(button).toBeDefined()

    userEvent.click(button)

    await waitFor(() => {
      expect(transactionService.addTransaction).toHaveBeenCalledWith({
        accountId: '1',
        amount: 100,
        type: 'DEPOSIT',
      })

      expect(toast.error).toHaveBeenCalledWith('Error al crear la transaccion')
    })
  })
})
