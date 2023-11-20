/** @format */

import { Navigate } from 'react-router-dom'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateAccount from './CreateAccount'
import { useUserContext } from '../../../user/context/UserContext'
import { accountService } from '../../service'
import { toast } from 'react-toastify'

jest.mock('../../../user/context/UserContext')
jest.mock('react-router-dom')

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const MockNavigate = Navigate as jest.MockedFunction<typeof Navigate>
// const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>
const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

describe('CreateAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render successfully', () => {
    MockNavigate.mockReturnValueOnce(null)

    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: { id: '1', document: '1234521' },
      account: null,
    }))

    const { getByText } = render(<CreateAccount />)
    expect(getByText('Crear cuenta')).toBeTruthy()
  })

  it('should navigate to / when user == null', () => {
    MockNavigate.mockReturnValueOnce(null)

    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: null,
      account: null,
    }))

    render(<CreateAccount />)
    expect(MockNavigate).toHaveBeenCalledWith({ to: '/' }, {})
  })

  it('should navigate to /home/account when account exists on context', () => {
    MockNavigate.mockReturnValueOnce(null)

    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: { id: '1', document: '1234521' },
      account: {
        accountId: '1',
        name: 'name',
        balance: 0,
        number: 19241,
        transactions: [],
      },
    }))

    render(<CreateAccount />)
    expect(MockNavigate).toHaveBeenCalledWith(
      {
        to: '/home/account',
      },
      {}
    )
  })

  it("should call to accountService.create when formik's onSubmit is called", async () => {
    const spy = jest.spyOn(toast, 'success').mockImplementationOnce(() => 'ID')
    jest.spyOn(accountService, 'create').mockResolvedValueOnce({
      success: true,
      data: {
        data: {
          id: '1234',
        },
      },
    })
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: { id: '1', document: '1234521' },
      account: null,
    })

    const { getByTestId } = render(<CreateAccount />)

    const nameInput = getByTestId('name-input')
    const accountNumberInput = getByTestId('account-number-input')
    const balanceInput = getByTestId('balance-input')

    const button = getByTestId('create-account-button')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(accountNumberInput, '1234')
    await userEvent.type(balanceInput, '0')
    await userEvent.click(button)

    await waitFor(() => {
      expect(accountService.create).toHaveBeenCalledWith({
        name: 'name',
        number: 1234,
        balance: 0,
      })

      expect(spy).toHaveBeenCalledWith(
        '¡Genial, la cuenta name fue creada correctamente!'
      )
    })
  })

  it('should fire toast with error when api fails', async () => {
    const spy = jest.spyOn(toast, 'error').mockImplementationOnce(() => 'ID')
    jest.spyOn(accountService, 'create').mockResolvedValueOnce({
      success: false,
      message: 'error',
    })
    mockUseUserContext.mockReturnValue({
      dispatch: jest.fn(),
      user: { id: '1', document: '1234521' },
      account: null,
    })

    const { getByTestId } = render(<CreateAccount />)

    const nameInput = getByTestId('name-input')
    const accountNumberInput = getByTestId('account-number-input')
    const balanceInput = getByTestId('balance-input')

    const button = getByTestId('create-account-button')

    await userEvent.type(nameInput, 'name')
    await userEvent.type(accountNumberInput, '1234')
    await userEvent.type(balanceInput, '0')
    await userEvent.click(button)

    await waitFor(() => {
      expect(accountService.create).toHaveBeenCalledWith({
        name: 'name',
        number: 1234,
        balance: 0,
      })

      expect(spy).toHaveBeenCalledWith('error')
    })
  })
})
