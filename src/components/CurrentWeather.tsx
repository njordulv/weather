import { useEffect, useMemo, useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import {
  useWeatherStore,
  selectIsMetric,
  selectWeatherData,
  selectIsLoading,
  selectIsError,
  selectErrorMessage,
} from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { WeatherPanel } from '@/components/ui/WeatherPanel'
import { WeatherDetails } from '@/components/ui/WeatherDetails'

export const CurrentWeather = () => {
  const fetchWeather = useWeatherStore((state) => state.fetchWeather)
  const data = useWeatherStore(selectWeatherData, shallow)
  const isLoading = useWeatherStore(selectIsLoading, shallow)
  const isError = useWeatherStore(selectIsError, shallow)
  const errorMessage = useWeatherStore(selectErrorMessage, shallow)
  const isMetric = useWeatherStore(selectIsMetric, shallow)

  const memoizedFetchWeather = useCallback(fetchWeather, [fetchWeather])

  useEffect(() => {
    memoizedFetchWeather()
  }, [memoizedFetchWeather])

  const weatherContent = useMemo(() => {
    if (isLoading) return <Loading />
    if (isError) return <Error message={errorMessage} />
    if (!data || !data.main || !data.name || !data.sys || !data.sys.country) {
      return <Error message={'No weather data available'} />
    }
    return null
  }, [data, isLoading, isError, errorMessage])

  return (
    <Block
      className="rounded-xl container col-span-12 row-span-2 justify-between lg:col-span-6 p-4 gap-3 min-h-[528px] relative overflow-hidden"
      variants={{
        initial: {
          scale: 0.95,
          opacity: 0,
          x: -100,
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
      {weatherContent}
      {data && data.main && data.name && data.sys && data.sys.country && (
        <>
          <WeatherPanel
            name={data.name}
            country={data.sys.country}
            temp={data.main.temp}
            weather={data.weather}
            isMetric={isMetric}
          />
          <WeatherDetails
            feels_like={data.main.feels_like}
            pressure={data.main.pressure}
            humidity={data.main.humidity}
            windSpeed={data.wind.speed}
            windDirection={data}
            cloudiness={data.clouds.all}
            sunrise={data.sys.sunrise}
            sunset={data.sys.sunset}
            isMetric={isMetric}
          />
        </>
      )}
    </Block>
  )
}
