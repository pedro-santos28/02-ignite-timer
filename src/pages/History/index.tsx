import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './style'
import { CyclesContext } from '../../contexts/CycleContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/esm/locale'
import { TableComponent } from './components/TableComponent'

export const History = () => {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1> Meu histórico </h1>
      <HistoryList>
        <TableComponent />
        {/* <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minuto(s)</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status status="done">Concluído</Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status status="interrupted">Interrompido</Status>
                    )}
                    {!cycle.interruptedDate && !cycle.finishedDate && (
                      <Status status="inProgress">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> */}
      </HistoryList>
    </HistoryContainer>
  )
}
