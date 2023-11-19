/** @format */

import { Outlet } from 'react-router-dom'
import { Container, Content, Title } from './styles'

const Home = () => {
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
