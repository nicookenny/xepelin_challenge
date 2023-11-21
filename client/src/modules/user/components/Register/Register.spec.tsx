/** @format */

import { NavLink } from 'react-router-dom'
import Register from './Register'
import { userService } from '../../service'
import { toast } from 'react-toastify'
import { render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    __esModule: true,
    NavLink: jest.fn(({ children }) => children),
    useNavigate: jest.fn(() => mockNavigate),
  }
})

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

const MockNavLink = NavLink as jest.MockedFunction<typeof NavLink>

describe('Register', () => {
  beforeEach(() => {
    MockNavLink.mockImplementationOnce(
      ({ children }) => children as ReactElement
    )
  })

  it('should render form and submit', async () => {
    const { getByText } = render(<Register />)

    expect(getByText('Registrarse')).toBeTruthy()
    expect(getByText('Iniciar sesión')).toBeTruthy()
  })

  it("should navigate to '/login when success after registering", async () => {
    jest.spyOn(toast, 'success').mockImplementationOnce(jest.fn())

    jest.spyOn(userService, 'register').mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: '123521',
        },
        success: true,
      })
    )

    const { getByText, getByTestId } = render(<Register />)

    const nameInput = getByTestId('name-input')
    const documentInput = getByTestId('document-input')
    const passwordInput = getByTestId('password-input')
    const confirmpasswordInput = getByTestId('confirm-password-input')
    const submitButton = getByText('Registrarse')

    await userEvent.type(nameInput, 'test')
    await userEvent.type(documentInput, '123456789')
    await userEvent.type(passwordInput, '123456')
    await userEvent.type(confirmpasswordInput, '123456')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
      expect(toast.success).toHaveBeenCalledWith(
        '¡Te registraste correctamente, iniciá sesión :) !'
      )
    })
  })

  it('should call toast.error when api fails', async () => {
    jest.spyOn(toast, 'error').mockImplementationOnce(jest.fn())

    jest.spyOn(userService, 'register').mockImplementationOnce(() =>
      Promise.resolve({
        message: 'Error',
        success: false,
      })
    )

    const { getByText, getByTestId } = render(<Register />)

    const nameInput = getByTestId('name-input')
    const documentInput = getByTestId('document-input')
    const passwordInput = getByTestId('password-input')
    const confirmpasswordInput = getByTestId('confirm-password-input')
    const submitButton = getByText('Registrarse')

    await userEvent.type(nameInput, 'test')
    await userEvent.type(documentInput, '123456789')
    await userEvent.type(passwordInput, '123456')
    await userEvent.type(confirmpasswordInput, '123456')

    await userEvent.click(submitButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error')
    })
  })
})
