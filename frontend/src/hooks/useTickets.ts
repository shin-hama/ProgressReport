import * as React from 'react'
import { useAxios } from './useAxios'

const serverUrl = process.env.REACT_APP_SERVER_URL

export const useTickets = () => {
  const { fetch } = useAxios()

  const actions = React.useMemo(() => {
    const a = {
      list: async () => {
        const result = await fetch(`${serverUrl}/tickets`)
        return result
      },
    }

    return a
  }, [fetch])

  return actions
}
