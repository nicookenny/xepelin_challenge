/** @format */

import { Navigate, useNavigate } from 'react-router-dom'
import { AccountDetail, AccountName, Container, Greeting } from './styles'
import TransactionList from '../../../transaction/components/TransactionList/TransactionList'
import { Button } from '@mui/material'
import { useUserContext } from '../../../user/context/UserContext'
import { useEffect } from 'react'
import { accountService } from '../../service'
import { toast } from 'react-toastify'
import {
  clearClient,
  fillTransactions,
} from '../../../user/context/UserActions'

const AccountInformation = () => {
  const navigate = useNavigate()
  const { user, account, dispatch } = useUserContext()

  if (!user) {
    return <Navigate to='/' />
  }

  if (!account?.accountId) {
    navigate('/home/create-account')
  }

  const logout = () => {
    navigate('/')
    dispatch(clearClient())
    localStorage.clear()
  }
  const getAccount = async (accountId: string) => {
    const response = await accountService.getDetails(accountId)

    if (response.success) {
      const accountInformation = response.data.data
      dispatch(fillTransactions(accountInformation.transactions))
    } else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    if (account?.accountId) {
      getAccount(account?.accountId)
    }
  }, [account?.accountId])

  if (!account) {
    return <Greeting>¡Estamos obteniendo la información de tu cuenta!</Greeting>
  }

  return (
    <Container>
      <Greeting>¡Bienvenido, {user?.document}!</Greeting>
      <AccountName>
        Esta es la información de tu cuenta "{account?.name}"
      </AccountName>

      <AccountDetail>
        <span>Tu número de cuenta es: {account?.number}</span>
        <span>Tu saldo es: ${account?.balance}</span>
      </AccountDetail>

      <TransactionList />

      <Button onClick={logout}>Cerrar sesión</Button>
    </Container>
  )
}

export default AccountInformation
