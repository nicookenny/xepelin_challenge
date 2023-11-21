/** @format */

import { Box, Button, MenuItem, Modal, Select, TextField } from '@mui/material'
import { TransactionForm } from './styles'
import { FC } from 'react'
import { useFormik } from 'formik'
import { useUserContext } from '../../../user/context/UserContext'
import { transactionService } from '../../service'
import { toast } from 'react-toastify'
import {
  TransactionDescription,
  TransactionDescriptionType,
  TransactionType,
} from '../../../common/models'
import { addTransaction } from '../../../user/context/UserActions'

const AddTransaction: FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const { account, dispatch } = useUserContext()
  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: TransactionType.DEPOSIT,
    },
    onSubmit: async (values) => {
      const response = await transactionService.addTransaction({
        accountId: account!.accountId,
        amount: values.amount,
        type: values.type as TransactionType,
      })

      if (response.success) {
        toast.success('¡Transacción realizada con éxito!')
        const createdTransaction = response.data.data
        dispatch(addTransaction(createdTransaction))
        formik.resetForm()
        onClose()
      } else {
        toast.error(response.message)
      }
    },
  })
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        <h3>Nueva Transacción</h3>
        <TransactionForm onSubmit={formik.handleSubmit}>
          <Select
            name='type'
            variant='filled'
            label='Tipo'
            fullWidth
            inputProps={{
              'data-testid': 'select-type',
            }}
            onChange={formik.handleChange}
            value={formik.values.type}>
            {Object.keys(TransactionType).map((type) => {
              const description =
                TransactionDescription[type as TransactionDescriptionType]
              return (
                <MenuItem key={type} value={type}>
                  {description}
                </MenuItem>
              )
            })}
          </Select>
          <TextField
            type='number'
            name='amount'
            variant='filled'
            label='Monto'
            fullWidth
            inputProps={{
              'data-testid': 'amount-input',
            }}
            onChange={formik.handleChange}
            value={formik.values.amount}
          />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            data-testid='submit-button'>
            Guardar
          </Button>
        </TransactionForm>
      </Box>
    </Modal>
  )
}

export default AddTransaction
