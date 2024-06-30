import { useEffect, useMemo, useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import { Box } from '@mui/material'
import { Block } from '@/components/ui/Block'
import {
  useWeatherStore,
  selectForecastData,
  selectIsLoading,
  selectIsError,
  selectErrorMessage,
} from '@/store/useWeatherStore'
import { ForecastData } from '@/interfaces'
import { Item } from '@/components/ui/Item'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'

export const Forecast: React.FC = () => {
  const fetchForecast = useWeatherStore((state) => state.fetchForecast)
  const data = useWeatherStore(selectForecastData, shallow)
  const isLoading = useWeatherStore(selectIsLoading, shallow)
  const isError = useWeatherStore(selectIsError, shallow)
  const errorMessage = useWeatherStore(selectErrorMessage, shallow)

  const memoizedFetchForecast = useCallback(fetchForecast, [fetchForecast])

  useEffect(() => {
    memoizedFetchForecast()
  }, [memoizedFetchForecast])

  const forecastContent = useMemo(() => {
    if (isLoading) return <Loading />
    if (isError) return <Error message={errorMessage} />
    if (!data || !data.list || data.list.length === 0)
      return <Error message={'No forecast data available'} />
    return null
  }, [data, isLoading, isError, errorMessage])

  const filteredData = useMemo(() => {
    if (!data || !data.list) return []
    return data.list.filter(
      (_: ForecastData, index: number) => (index + 1) % 8 === 0
    )
  }, [data])

  return (
    <Block
      className="rounded-xl container col-span-12 row-span-2 lg:col-span-6 p-4 gap-5 lg:min-h-[528px] relative overflow-hidden"
      variants={{
        initial: {
          scale: 0.95,
          opacity: 0,
          x: 100,
          y: 20,
        },
        animate: {
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
        },
      }}
    >
      {forecastContent}
      {filteredData.length > 0 && (
        <>
          <h2>5-day Forecast</h2>
          <Box component="ul" className="forecast-list">
            {filteredData.map((item: ForecastData) => (
              <Item key={item.dt} {...item} />
            ))}
          </Box>
        </>
      )}
    </Block>
  )
}
