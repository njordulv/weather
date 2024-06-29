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
import { WeatherData } from '@/interfaces'

export const CurrentWeather: React.FC = () => {
  const fetchWeather = useWeatherStore((state) => state.fetchWeather)
  const data = useWeatherStore(selectWeatherData, shallow) as WeatherData | null
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

  if (!data || !data.main || !data.name || !data.sys || !data.sys.country) {
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
      </Block>
    )
  }

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, pressure, humidity },
    weather,
    wind: { speed },
    clouds: { all: cloudiness },
  } = data

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
      <WeatherPanel
        name={name}
        country={country}
        temp={temp}
        weather={weather}
        isMetric={isMetric}
      />
      <WeatherDetails
        feels_like={feels_like}
        pressure={pressure}
        humidity={humidity}
        windSpeed={speed}
        windDirection={data}
        cloudiness={cloudiness}
        sunrise={sunrise}
        sunset={sunset}
        isMetric={isMetric}
      />
    </Block>
  )
}
