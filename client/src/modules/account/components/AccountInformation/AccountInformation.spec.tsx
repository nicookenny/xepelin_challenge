/** @format */

import { render, waitFor } from '@testing-library/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../user/context/UserContext'
import { accountService } from '../../service'
import { toast } from 'react-toastify'
import AccountInformation from './AccountInformation'
import { userEvent } from '@testing-library/user-event'

jest.mock('../../../user/context/UserContext')

const mockNavigate = jest.fn()
jest.mock('react-router-dom')

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

const MockNavigate = Navigate as jest.MockedFunction<typeof Navigate>
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>

describe('AccountInformation', () => {
  it("should Navigate to '/' when user == null", () => {
    MockNavigate.mockReturnValueOnce(null)

    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: null,
      account: null,
    })

    render(<AccountInformation />)

    expect(MockNavigate).toHaveBeenCalledWith(
      {
        to: '/',
      },
      {}
    )
  })
  it('shoulde render successfully when account exists on context', async () => {
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: {
        id: '1',
        document: '1234521',
      },
      account: {
        accountId: '112412414',
        number: 123,
        name: 'name',
        balance: 0,
        transactions: [
          {
            id: '1',
            amount: 100,
            type: 'deposit',
            date: new Date().toISOString(),
          },
        ],
      } as any,
    })

    jest.spyOn(accountService, 'getDetails').mockResolvedValueOnce({
      success: true,
      data: {
        data: {
          id: '1',
          name: 'name',
          number: 123,
          balance: 0,
          transactions: [
            {
              id: '1',
              amount: 100,
              type: 'deposit',
              date: new Date().toISOString(),
            },
          ],
        },
      },
    })

    const { getByText } = render(<AccountInformation />)

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled()
      expect(getByText('¡Bienvenido, 1234521!'))
      expect(getByText('Tu número de cuenta es: 123'))
      expect(getByText('Depósito'))
      expect(getByText('US$ 100,00'))
    })
  })

  it("should navigate to /home/create-account when account doesn't exists on context", () => {
    mockUseNavigate.mockReturnValue(mockNavigate)

    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: {
        id: '1',
        document: '1234521',
      },
      account: null,
    })

    render(<AccountInformation />)
    expect(mockNavigate).toHaveBeenCalledWith('/home/create-account')
  })
  it('should fire error toast when api fails', async () => {
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: {
        id: '1',
        document: '1234521',
      },
      account: {
        accountId: '112412414',
        number: 123,
        name: 'name',
        balance: 0,
        transactions: [
          {
            id: '1',
            amount: 100,
            type: 'deposit',
            date: new Date().toISOString(),
          },
        ],
      } as any,
    })

    const spy = jest.spyOn(toast, 'error').mockImplementationOnce(() => 'ID')

    jest.spyOn(accountService, 'getDetails').mockResolvedValueOnce({
      success: false,
      message: 'error',
    })

    render(<AccountInformation />)

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith('error')
    })
  })

  it('should call navigate(/) when click logout button', async () => {
    mockUseNavigate.mockReturnValue(mockNavigate)
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: {
        id: '1',
        document: '1234521',
      },
      account: {
        accountId: '112412414',
        number: 123,
        name: 'name',
        balance: 0,
        transactions: [
          {
            id: '1',
            amount: 100,
            type: 'deposit',
            date: new Date().toISOString(),
          },
        ],
      } as any,
    })

    jest.spyOn(accountService, 'getDetails').mockResolvedValueOnce({
      success: true,
      data: {
        data: {
          id: '1',
          name: 'name',
          number: 123,
          balance: 0,
          transactions: [
            {
              id: '1',
              amount: 100,
              type: 'deposit',
              date: new Date().toISOString(),
            },
          ],
        },
      },
    })

    const { getByTestId } = render(<AccountInformation />)

    const button = getByTestId('button-logout')

    userEvent.click(button)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})
