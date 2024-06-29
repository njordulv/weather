import { useEffect, useMemo, useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import { Box, Stack } from '@mui/material'
import {
  WiThermometer,
  WiCelsius,
  WiFahrenheit,
  WiStrongWind,
  WiHumidity,
} from 'react-icons/wi'
import { Block } from '@/components/ui/Block'
import {
  useWeatherStore,
  selectIsMetric,
  selectForecastData,
  selectIsLoading,
  selectIsError,
  selectErrorMessage,
} from '@/store/useWeatherStore'
import { ForecastData } from '@/interfaces'
import { formatDateTime } from '@/utils'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { Clouds } from '@/components/ui/Clouds'

export const Forecast: React.FC = () => {
  const fetchForecast = useWeatherStore((state) => state.fetchForecast)
  const data = useWeatherStore(selectForecastData, shallow)
  const isLoading = useWeatherStore(selectIsLoading, shallow)
  const isError = useWeatherStore(selectIsError, shallow)
  const errorMessage = useWeatherStore(selectErrorMessage, shallow)
  const isMetric = useWeatherStore(selectIsMetric, shallow)

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
    return data.list.filter((_: any, index: number) => (index + 1) % 8 === 0)
  }, [data])

  return (
    <Block
      className="rounded-xl container col-span-12 row-span-2 lg:col-span-6 p-4 gap-5 min-h-[528px] relative overflow-hidden"
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
      {filteredData.length > 0 && <h2>5-day Forecast</h2>}
      <Box component="ul" className="forecast-list">
        {filteredData.map(
          ({ dt, dt_txt, weather, main, wind }: ForecastData) => (
            <Stack component="li" key={dt} flexDirection="row">
              <Stack>
                <Box component="b" position="relative" zIndex="2">
                  {formatDateTime(dt_txt)}
                </Box>
                <span>
                  <Clouds
                    data={weather?.[0] ?? {}}
                    iconSize={30}
                    description={true}
                  />
                </span>
              </Stack>
              <Stack useFlexGap alignItems="center" flexDirection="row">
                <WiThermometer size={22} />
                <b className="text-3xl">{Math.ceil(main?.temp ?? 0)} </b>
                {isMetric ? (
                  <WiCelsius size={34} />
                ) : (
                  <WiFahrenheit size={34} />
                )}
              </Stack>
              <Stack
                useFlexGap
                alignItems="center"
                gap="5px"
                flexDirection="row"
              >
                <WiStrongWind size={30} />
                <b>{(wind?.speed ?? 0).toFixed(1)}</b>
                <i>{isMetric ? 'm/s' : 'mph'}</i>
              </Stack>
              <Stack
                useFlexGap
                alignItems="center"
                gap="5px"
                flexDirection="row"
              >
                <WiHumidity size={28} />
                {main?.humidity ?? 0} %
              </Stack>
            </Stack>
          )
        )}
      </Box>
    </Block>
  )
}
