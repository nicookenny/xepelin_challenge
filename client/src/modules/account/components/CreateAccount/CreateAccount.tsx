/** @format */

import { Container } from './styles'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import { accountService } from '../../service'
import { toast } from 'react-toastify'
import { useUserContext } from '../../../user/context/UserContext'
import { useEffect } from 'react'
import { setAccount } from '../../../user/context/UserActions'

const CreateAccount = () => {
  const navigate = useNavigate()
  const { dispatch, user } = useUserContext()

  const formik = useFormik({
    initialValues: {
      name: '',
      accountNumber: '',
      balance: 0,
    },
    onSubmit: async (values) => {
      const response = await accountService.create({
        name: values.name,
        number: +values.accountNumber,
        balance: values.balance,
      })

      if (response.success) {
        dispatch(
          setAccount({
            name: values.name,
            number: +values.accountNumber,
            accountId: response.data.data.id,
            balance: values.balance,
            transactions: [],
          })
        )

        toast.success(
          `¡Genial, la cuenta ${values.name} fue creada correctamente!`
        )

        formik.resetForm()
      } else {
        toast.error(response.message)
      }
    },
  })

  if (!user) {
    return <Navigate to='/' />
  }

  if (user.account?.accountId) {
    return <Navigate to='/home/account' />
  }

  useEffect(() => {
    if (user.account?.accountId) {
      navigate('/home/account')
    }
  }, [])

  return (
    <Container onSubmit={formik.handleSubmit}>
      <TextField
        type='text'
        name='name'
        label='Tu nombre'
        variant='filled'
        fullWidth
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <TextField
        type='text'
        name='accountNumber'
        variant='filled'
        label='Número de cuenta'
        onChange={formik.handleChange}
        fullWidth
        value={formik.values.accountNumber}
      />

      <TextField
        type='number'
        name='balance'
        label='Saldo'
        fullWidth
        variant='filled'
        onChange={formik.handleChange}
        value={formik.values.balance}
      />

      <Button type='submit'>Crear cuenta</Button>
    </Container>
  )
}

export default CreateAccount
