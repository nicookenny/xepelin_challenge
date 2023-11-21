/** @format */

import { useFormik } from 'formik'
import { Container, RegisterForm } from './styles'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { userService } from '../../service'
import { Button, TextField } from '@mui/material'

const registerSchema = yup.object().shape({
  document: yup.string().required('El documento es requerido'),
  password: yup.string().required('La contraseña es requerida'),
  name: yup.string().required('El nombre es requerido'),
  confirmPassword: yup
    .string()
    .required('La confirmación de contraseña es requerida')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
})

const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      document: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { document, password, name } = values

      const result = await userService.register({ document, password, name })

      if (result.success) {
        toast.success('¡Te registraste correctamente, iniciá sesión :) !')
        navigate('/login')
      } else {
        toast.error(result.message)
      }
    },
  })
  return (
    <Container>
      <RegisterForm onSubmit={formik.handleSubmit}>
        <TextField
          type='text'
          name='name'
          label='Nombre y apellido'
          inputProps={{
            'data-testid': 'name-input',
          }}
          variant='filled'
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          type='text'
          name='document'
          label='Documento'
          variant='filled'
          fullWidth
          inputProps={{
            'data-testid': 'document-input',
          }}
          onChange={formik.handleChange}
          value={formik.values.document}
          error={formik.touched.document && Boolean(formik.errors.document)}
          helperText={formik.touched.document && formik.errors.document}
        />

        <TextField
          type='password'
          name='password'
          label='Contraseña'
          inputProps={{
            'data-testid': 'password-input',
          }}
          variant='filled'
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          type='password'
          name='confirmPassword'
          label='Confirmar Contraseña'
          inputProps={{
            'data-testid': 'confirm-password-input',
          }}
          variant='filled'
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          size='large'>
          Registrarse
        </Button>
        <NavLink to='/login'>
          <Button variant='text' fullWidth size='large'>
            Iniciar sesión
          </Button>
        </NavLink>
      </RegisterForm>
    </Container>
  )
}

export default Register
