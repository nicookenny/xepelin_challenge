/** @format */

import { useNavigate } from 'react-router-dom'
import Login from './Login'
// import { useUserContext } from '../../context/UserContext'
import { userEvent } from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react'
import { userService } from '../../service'
import { toast } from 'react-toastify'

jest.mock('../../../common/constants/config', () => ({
  apiConfig: {
    BASE_URL: 'http://localhost:3000',
  },
}))

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    __esModule: true,
    useNavigate: jest.fn(),
    NavLink: jest.fn(({ children }) => children),
  }
})

describe('Login', () => {
  it('should render login successfully', () => {
    const mockUseNavigate = useNavigate as jest.MockedFunction<
      typeof useNavigate
    >
    mockUseNavigate.mockReturnValue(jest.fn())

    const { getByTestId } = render(<Login />)

    const button = getByTestId('login-button')

    expect(button).toBeDefined()
  })

  it('should render errors when inputs arent filled', async () => {
    const mockUseNavigate = useNavigate as jest.MockedFunction<
      typeof useNavigate
    >

    mockUseNavigate.mockReturnValue(jest.fn())

    const { getByTestId, getByText } = render(<Login />)

    const button = getByTestId('login-button')

    userEvent.click(button)

    await waitFor(() => {
      expect(getByText('El documento es requerido')).toBeTruthy()
      expect(getByText('La contraseña es requerida')).toBeTruthy()
    })
  })

  it('should call navigate and fire toast when login succesfully', async () => {
    jest.spyOn(toast, 'success').mockImplementationOnce(jest.fn())
    jest.spyOn(userService, 'login').mockResolvedValue({
      success: true,
      data: {
        document: '123456789',
        id: '123456789',
        account: null,
      },
    })

    const mockUseNavigate = useNavigate as jest.MockedFunction<
      typeof useNavigate
    >

    mockUseNavigate.mockReturnValue(jest.fn())

    const { getByTestId } = render(<Login />)

    const document = getByTestId('document-input')
    const password = getByTestId('password-input')

    await userEvent.type(document, '123456789')
    await userEvent.type(password, '123456')

    const button = getByTestId('login-button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalled()
      expect(toast.success).toHaveBeenCalledWith('¡Bienvenido!')
    })
  })

  it('should call toast.error when api fails', async () => {
    jest.spyOn(toast, 'error').mockImplementationOnce(jest.fn())
    jest.spyOn(userService, 'login').mockResolvedValue({
      success: false,
      message: "El usuario no existe",
    })

    const mockUseNavigate = useNavigate as jest.MockedFunction<
      typeof useNavigate
    >

    mockUseNavigate.mockReturnValue(jest.fn())

    const { getByTestId } = render(<Login />)

    const document = getByTestId('document-input')
    const password = getByTestId('password-input')

    await userEvent.type(document, '123456789')
    await userEvent.type(password, '123456')

    const button = getByTestId('login-button')
    await userEvent.click(button)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('El usuario no existe')
    })
  })
})
