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
// import { Clouds } from '@/components/ui/Clouds'

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
    if (!data || !data.list) return <Error message={'No data available'} />

    type ForecastItem = ForecastData['list'][0]

    const filteredData =
      data.list.filter((_: any, index: number) => (index + 1) % 8 === 0) || []

    return (
      <Box component="ul" className="forecast-list">
        <h2>5-day Forecast</h2>
        {filteredData.map((item: ForecastItem) => (
          <Stack component="li" key={item.dt_txt} flexDirection="row">
            <Stack>
              <b>{formatDateTime(item.dt_txt)}</b>
              <span>
                {/* <Clouds data={item} iconSize={30} description={true} /> */}
              </span>
            </Stack>
            <Stack useFlexGap alignItems="center" flexDirection="row">
              <WiThermometer size={22} />
              <b className="text-3xl">{Math.ceil(item.main.temp)} </b>
              {isMetric ? <WiCelsius size={34} /> : <WiFahrenheit size={34} />}
            </Stack>
            <Stack useFlexGap alignItems="center" gap="5px" flexDirection="row">
              <WiStrongWind size={30} />
              <b>{item.wind.speed.toFixed(1)}</b>
              <i>{isMetric ? 'm/s' : 'mph'}</i>
            </Stack>
            <Stack useFlexGap alignItems="center" gap="5px" flexDirection="row">
              <WiHumidity size={28} />
              {item.main.humidity} %
            </Stack>
          </Stack>
        ))}
      </Box>
    )
  }, [data, isLoading, isError, errorMessage, isMetric])

  return (
    <Block className="col-span-12 row-span-2 lg:col-span-6 p-4 gap-5 min-h-[428px] relative overflow-hidden">
      {forecastContent}
    </Block>
  )
}

export default Forecast
