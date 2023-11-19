/** @format */

import { Outlet, useNavigate } from 'react-router-dom'
import { Container, Content, Title } from './styles'
import { useUserContext } from '../../modules/user/context/UserContext'
import { useEffect } from 'react'
import { IUser } from '../../modules/user/model'

const Home = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()

  const handleAuthentication = (user: IUser | null) => {
    if (!user) {
      navigate('/')
    } else {
      if (user.accountId) {
        navigate('/home/account')
      } else {
        navigate('/home/create-account')
      }
    }
  }

  useEffect(() => {
    handleAuthentication(user)
  }, [user])

  return (
    <Container>
      <Title>Administración de cuenta bancaria :)</Title>
      <Content>
        <Outlet />
      </Content>
    </Container>
  )
}

export default Home
