import React from 'react'
import Box from '@mui/material/Box'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Table from 'components/elements/Table'
import { useTickets } from 'hooks/useTickets'
import DateRangePicker from 'components/modules/DateRangePicker'

function App() {
  const { list } = useTickets()
  const [tickets, setTickets] = React.useState([])

  React.useEffect(() => {
    list().then((result) => {
      setTickets(result.data.tickets)
    })
  }, [list])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DateRangePicker />
        <Table contents={tickets}></Table>
      </Box>
    </LocalizationProvider>
  )
}

export default App
