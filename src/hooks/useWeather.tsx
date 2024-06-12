import useSWR from 'swr'

interface ApiProps {
  endpoint: string
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('This API key is not valid anymore')
      }
      throw new Error('There is an error')
    }
    return res.json()
  })

export const useWeather = ({ endpoint }: ApiProps) => {
  const { data, error, isLoading } = useSWR(endpoint, fetcher)

  return {
    data: data,
    isError: error,
    errorMessage: error ? error.message : '',
    isLoading,
  }
}
