import * as React from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export const useAxios = () => {
  const actions = React.useMemo(() => {
    const a = {
      fetch: async (url: string, config?: AxiosRequestConfig) => {
        return await axios.get(url, config)
      },
    }
    return a
  }, [])

  return actions
}
