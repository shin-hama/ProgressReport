import React from 'react'
import Box from '@mui/material/Box'

import Table from 'components/elements/Table'
import { useTickets } from 'hooks/useTickets'

function App() {
  const { list } = useTickets()
  const [tickets, setTickets] = React.useState([])

  React.useEffect(() => {
    list().then((result) => {
      setTickets(result.data.tickets)
    })
  }, [list])

  return (
    <Box>
      <Table contents={tickets}></Table>
    </Box>
  )
}

export default App
