import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Dashboard from 'components/layout/Dashboard'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dashboard />
    </LocalizationProvider>
  )
}

export default App
