import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

type Props = {
  onChange?: (start: Date, end: Date) => void
}
const DateRangePicker: React.FC<Props> = ({ onChange }) => {
  const [start, setStart] = React.useState<Date | null>(
    dayjs().add(-7, 'day').toDate()
  )
  const [end, setEnd] = React.useState<Date | null>(new Date())

  React.useEffect(() => {
    if (start && end) {
      onChange?.(start, end)
    }
  }, [start, end, onChange])

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <DatePicker
          label="Start"
          value={start}
          inputFormat="YYYY/MM/DD"
          mask={'____/__/__'}
          onChange={(newValue) => {
            setStart(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End"
          value={end}
          inputFormat="YYYY/MM/DD"
          mask={'____/__/__'}
          onChange={(newValue) => {
            setEnd(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </Box>
  )
}

export default DateRangePicker
