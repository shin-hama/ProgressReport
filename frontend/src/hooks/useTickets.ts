import * as React from 'react'
import dayjs from 'dayjs'

import { useAxios } from './useAxios'

const serverUrl = process.env.REACT_APP_SERVER_URL

export type DateRangeQuery = {
  start: Date
  end: Date
}

export const useTickets = () => {
  const { fetch } = useAxios()

  const actions = React.useMemo(() => {
    const a = {
      list: async (range?: DateRangeQuery) => {
        let config = {}
        if (range) {
          const start = dayjs(range.start).format('YYYY-MM-DD')
          const end = dayjs(range.end).format('YYYY-MM-DD')

          config = {
            ...config,
            params: {
              start,
              end,
            },
          }
        }

        const result = await fetch(`${serverUrl}/tickets`, config)
        return result
      },
    }

    return a
  }, [fetch])

  return actions
}
