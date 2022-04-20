import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import DateRangePicker from 'components/modules/DateRangePicker'
import TicketsTable from 'components/modules/TicketsTable'

const Dashboard = () => {
  const [range, setRange] = React.useState('')

  const handleChangeDateRange = React.useCallback((start: Date, end: Date) => {
    const startStr = dayjs(start).format('YYYY-MM-DD')
    const endStr = dayjs(end).format('YYYY-MM-DD')

    setRange(`${startStr} ~ ${endStr}`)
  }, [])

  return (
    <Box p={4}>
      <DateRangePicker onChange={handleChangeDateRange} />
      <Typography component="h2" variant="h4">
        {`Progress Report: ${range}`}
      </Typography>
      <TicketsTable />
    </Box>
  )
}

export default Dashboard
