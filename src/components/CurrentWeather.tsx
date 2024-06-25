import { useEffect, useMemo, useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import {
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiCelsius,
  WiFahrenheit,
  WiSmallCraftAdvisory,
  WiCloud,
} from 'react-icons/wi'
import {
  useWeatherStore,
  selectIsMetric,
  selectWeatherData,
  selectIsLoading,
  selectIsError,
  selectErrorMessage,
} from '@/store/useWeatherStore'
import { getFormattedTime } from '@/utils'
import { Block } from '@/components/ui/Block'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'
import { Today, TheCity, Temperature, Wind } from '@/components/ui/Parts'
import { Clouds } from '@/components/ui/Clouds'
import { WindSpeed } from '@/components/ui/WindSpeed'
import { WindDirection } from '@/components/ui/WindDirection'

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
    if (!data || !data.main || !data.name || !data.sys || !data.sys.country)
      return <Error message={'No data available'} />
    return null
  }, [data, isLoading, isError, errorMessage])

  return (
    <Block className="col-span-12 row-span-2 lg:col-span-6 p-4 gap-3 min-h-[428px] relative overflow-hidden">
      {weatherContent}
      {data && (
        <>
          <div className="weather-panel">
            <div>
              <TheCity name={data.name} country={data.sys.country} />
              <Today />
            </div>
            <div className="flex text-6xl sm:justify-end">
              <Temperature temp={data.main.temp} />
              {isMetric ? <WiCelsius /> : <WiFahrenheit />}
            </div>
            <div className="flex flex-col justify-center items-end">
              <Clouds data={data.weather[0]} iconSize={60} description={true} />
            </div>
          </div>
          <ul className="weather-list">
            <li>
              <span>
                <WiThermometer size={24} />
                Feels like:
              </span>
              <b>
                <Temperature temp={data.main.feels_like} />
                {isMetric ? '°C' : '°F'}
              </b>
            </li>
            <li>
              <span>
                <WiBarometer size={24} /> Pressure:
              </span>
              <b>{data.main.pressure} hPa</b>
            </li>
            <li>
              <span>
                <WiHumidity size={24} /> Humidity:
              </span>
              <b>{data.main.humidity} %</b>
            </li>
            <li>
              <span>
                <WiStrongWind size={24} />
                Wind Speed:
              </span>
              <span>
                <Wind temp={data.wind.speed} />
                <em>{isMetric ? 'm/s' : 'mph'}</em>
              </span>
            </li>
            <li>
              <span>
                <WiSmallCraftAdvisory size={24} /> Direction:
              </span>
              <span>
                <WindDirection data={data} />
              </span>
            </li>
            <li>
              <WindSpeed data={data} />
            </li>
            <li>
              <span>
                <WiCloud size={24} />
                Clouds:
              </span>
              <b>{data.clouds.all} %</b>
            </li>
            <li>
              <span>
                <WiSunrise size={24} /> Sunrise:
              </span>
              <b>{getFormattedTime(data.sys.sunrise)}</b>
            </li>
            <li>
              <span>
                <WiSunset size={24} /> Sunset:
              </span>
              <b>{getFormattedTime(data.sys.sunset)}</b>
            </li>
          </ul>
        </>
      )}
    </Block>
  )
}
