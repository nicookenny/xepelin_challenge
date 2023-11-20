/** @format */
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../modules/user/context/UserContext'
import Home from './Home'
import { render } from '@testing-library/react'

jest.mock('../../modules/user/context/UserContext')
jest.mock('react-router-dom')

const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>

describe('Home', () => {
  it('should render successfully', () => {
    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: null,
      account: null,
    }))

    const navigate = jest.fn()
    mockUseNavigate.mockImplementationOnce(() => navigate)

    const { getByText } = render(<Home />)
    expect(getByText('Administración de cuenta bancaria :)')).toBeTruthy()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should move to /home/account when accountId exists on context', () => {
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

    const navigate = jest.fn()
    mockUseNavigate.mockImplementationOnce(() => navigate)

    const { getByText } = render(<Home />)
    expect(getByText('Administración de cuenta bancaria :)')).toBeTruthy()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/home/account')
  })

  it("should move to /home/create-account when accountId doesn't exists on context", () => {
    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: { id: '1', document: '1234521' },
      account: null,
    }))

    const navigate = jest.fn()
    mockUseNavigate.mockImplementationOnce(() => navigate)

    const { getByText } = render(<Home />)
    expect(getByText('Administración de cuenta bancaria :)')).toBeTruthy()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/home/create-account')
  })
})
