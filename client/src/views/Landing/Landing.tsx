/** @format */

import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../modules/user/context/UserContext'
import Login from '../../modules/user/components/Login/Login'
import { LandingContainer } from './styles'

const Landing = () => {
  const { user } = useUserContext()

  if (user) {
    return <Navigate to='home' />
  }

  return (
    <LandingContainer>
      <h1>Banking App</h1>
      <Outlet />
    </LandingContainer>
  )
}

export default Landing
