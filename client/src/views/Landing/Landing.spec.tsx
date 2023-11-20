/** @format */
import { MemoryRouter, Navigate } from 'react-router-dom'
import { useUserContext } from '../../modules/user/context/UserContext'
import Landing from './Landing'
import { render } from '@testing-library/react'

jest.mock('../../modules/user/context/UserContext')
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return {
    ...actual,
    __esModule: true,
    Navigate: jest.fn(() => null),
  }
})
const mockUseUserContext = useUserContext as jest.MockedFunction<
  typeof useUserContext
>

const MockNavigate = Navigate as jest.MockedFunction<typeof Navigate>

describe('Landing', () => {
  it('should render successfully', () => {
    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: {
        document: '123456789',
        id: '1',
      },
      account: null,
    }))

    const navigate = jest.fn()
    MockNavigate.mockImplementationOnce(({ to }) => navigate(to))

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    expect(navigate).toHaveBeenCalledTimes(1)
  })

  it("should render successfully when user doesn't exists", () => {
    mockUseUserContext.mockImplementationOnce(() => ({
      dispatch: jest.fn(),
      user: null,
      account: null,
    }))

    const navigate = jest.fn()
    MockNavigate.mockImplementationOnce(({ to }) => navigate(to))

    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )

    expect(navigate).toHaveBeenCalledTimes(0)
  })
})
