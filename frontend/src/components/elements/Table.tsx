import * as React from 'react'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type Props<T> = {
  contents: Array<T>
}
const Table = <T,>({ contents }: Props<T>) => {
  if (contents.length === 0) {
    return <>no contents</>
  }
  return (
    <MuiTable sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          {Object.keys(contents[0]).map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {contents.map((content, i) => (
          <TableRow
            key={`content-${i}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {Object.entries(content).map(([key, value]) => (
              <TableCell key={`${key}-${i}`}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  )
}

export default Table
