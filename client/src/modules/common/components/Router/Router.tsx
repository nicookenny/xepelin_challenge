/** @format */

import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import CreateAccount from '../../../account/components/CreateAccount/CreateAccount'
import AccountInformation from '../../../account/components/AccountInformation/AccountInformation'
import Landing from '../../../../views/Landing/Landing'
import Home from '../../../../views/Home/Home'
import Login from '../../../user/components/Login/Login'
import Register from '../../../user/components/Register/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    children: [
      {
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to='login' />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: 'home',
    element: <Home />,
    children: [
      {
        element: <Outlet />,
        children: [
          {
            path: 'create-account',
            element: <CreateAccount />,
          },
          {
            path: 'account',
            element: <AccountInformation />,
          },
        ],
      },
    ],
  },
])
