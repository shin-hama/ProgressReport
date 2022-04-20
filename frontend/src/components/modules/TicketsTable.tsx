import * as React from 'react'
import Card from '@mui/material/Card'

import Table from 'components/elements/Table'
import { useTickets } from 'hooks/useTickets'

type Props = {
  range?: {
    start: Date
    end: Date
  }
}
const TicketsTable: React.FC<Props> = ({ range }) => {
  const { list } = useTickets()
  const [tickets, setTickets] = React.useState([])

  React.useEffect(() => {
    list().then((result) => {
      setTickets(result.data.tickets)
    })
  }, [list])

  return (
    <Card>
      <Table contents={tickets}></Table>
    </Card>
  )
}

export default TicketsTable
