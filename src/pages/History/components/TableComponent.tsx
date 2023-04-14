import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { CyclesContext } from '../../../contexts/CycleContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Status } from '../style'

interface Column {
  id: 'task' | 'minutesAmount' | 'startDate' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  { id: 'task', label: 'Tarefa', minWidth: 170 },
  { id: 'minutesAmount', label: 'Duração', minWidth: 170 },
  {
    id: 'startDate',
    label: 'Inicio',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
]

interface Data {
  name: string
  code: string
  population: number
  size: number
  density: number
}

export function TableComponent() {
  const { cycles: rows } = React.useContext(CyclesContext)

  console.log(rows)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  console.log(rows)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.task}</TableCell>
                    <TableCell>{row.minutesAmount} minuto(s)</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(row.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>
                      {row.finishedDate && (
                        <Status status="done">Concluído</Status>
                      )}
                      {row.interruptedDate && (
                        <Status status="interrupted">Interrompido</Status>
                      )}
                      {!row.interruptedDate && !row.finishedDate && (
                        <Status status="inProgress">Em andamento</Status>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
