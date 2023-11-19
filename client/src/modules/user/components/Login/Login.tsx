/** @format */

import { useFormik } from 'formik'
import { Container, LoginForm } from './styles'
import { Button, TextField } from '@mui/material'
import { userService } from '../../service'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import { setClient } from '../../context/UserActions'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  document: yup.string().required('El documento es requerido'),
  password: yup.string().required('La contraseña es requerida'),
})

const Login = () => {
  const navigate = useNavigate()
  const { dispatch } = useUserContext()
  const formik = useFormik({
    initialValues: {
      document: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { document, password } = values
      const result = await userService.login({ document, password })

      if (result.success) {
        const { document, id, account } = result.data
        dispatch(
          setClient({
            document,
            id,
            account,
          })
        )
        toast.success('¡Bienvenido!')
        navigate('/home')
      } else {
        toast.error(result.message)
      }
    },
  })
  return (
    <Container>
      <LoginForm onSubmit={formik.handleSubmit}>
        <TextField
          type='text'
          name='document'
          label='Documento'
          variant='filled'
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.document}
          error={formik.touched.document && Boolean(formik.errors.document)}
        />
        <TextField
          type='password'
          name='password'
          label='Contraseña'
          variant='filled'
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          size='large'>
          Ingresar
        </Button>
        <NavLink to='/register'>
          <Button variant='text' fullWidth size='large'>
            Registrarse
          </Button>
        </NavLink>
      </LoginForm>
    </Container>
  )
}

export default Login
