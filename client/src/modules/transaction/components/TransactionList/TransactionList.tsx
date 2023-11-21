/** @format */

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { formatAmount, formatDate } from '../../../common/utils'
import { Header, Title } from './styles'
import AddTransaction from '../AddTransaction/AddTransaction'
import {
  TransactionDescription,
  TransactionDescriptionType,
} from '../../../common/models'
import { useUserContext } from '../../../user/context/UserContext'

const TransactionList: FC = () => {
  const { account } = useUserContext()
  const [addingTransaction, setAddingTransaction] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div>
      <AddTransaction
        open={addingTransaction}
        onClose={() => setAddingTransaction(false)}
      />
      <Header>
        <Title>Lista de transacciones </Title>
        <Button
          variant='text'
          color='primary'
          size='small'
          onClick={() => setAddingTransaction(true)}>
          Nueva transacción
        </Button>
      </Header>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Fecha</TableCell>
              <TableCell align='left'>Importe</TableCell>
              <TableCell align='left'>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? account?.transactions?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : account?.transactions
            )?.map((row) => (
              <TableRow key={row.id}>
                <TableCell align='left'>{formatDate(row.date)}</TableCell>
                <TableCell align='left'>{formatAmount(row.amount)}</TableCell>
                <TableCell align='left'>
                  {
                    TransactionDescription[
                      row.type.toUpperCase() as TransactionDescriptionType
                    ]
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                colSpan={3}
                count={account?.transactions?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TransactionList
