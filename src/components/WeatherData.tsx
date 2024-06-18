import { useEffect } from 'react'
import { getFormattedTime, getDate } from '@/utils'
import { Block } from '@/components/ui/Block'
import { WindSpeed } from '@/components/ui/WindSpeed'
import { WindDirection } from '@/components/ui/WindDirection'
import {
  useWeatherStore,
  selectIsMetric,
  selectWeatherData,
  selectIsLoading,
  selectIsError,
  selectErrorMessage,
} from '@/store/useWeatherStore'

export const WeatherData = () => {
  const fetchWeather = useWeatherStore((state) => state.fetchWeather)
  const data = useWeatherStore(selectWeatherData)
  const isLoading = useWeatherStore(selectIsLoading)
  const isError = useWeatherStore(selectIsError)
  const errorMessage = useWeatherStore(selectErrorMessage)
  const isMetric = useWeatherStore(selectIsMetric)

  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {errorMessage}</p>
  if (!data || !data.main || !data.weather || !data.sys)
    return <p>No data available</p>

  const temp1 = Math.ceil(data.main.temp)
  const temp2 = Math.ceil(data.main.feels_like)
  const tempMin = Math.ceil(data.main.temp_min)
  const tempMax = Math.ceil(data.main.temp_max)
  const wind = data.wind.speed.toFixed(1)
  const visibility = (data.visibility / 1000).toFixed(1)

  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 bg-white shadow-lg p-6 flex flex-col gap-5">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <ul>
        <li>
          <img
            width="50"
            height="50"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />{' '}
          {`${temp1}${isMetric ? '°C' : '°F'}`}
        </li>
        <li>Today {getDate()}</li>
        <li>Feels like: {`${temp2}${isMetric ? '°C' : '°F'}`}</li>
        <li>{data.weather[0].description}</li>
        <li>Min: {`${tempMin}${isMetric ? '°C' : '°F'}`}</li>
        <li>Max: {`${tempMax}${isMetric ? '°C' : '°F'}`}</li>
        <li>Pressure: {data.main.pressure} hPa</li>
        <li>Humidity: {data.main.humidity} %</li>
        <li>
          Wind:{' '}
          <span className="lowercase">
            {`${wind}${isMetric ? 'm/s' : 'mph'}`}{' '}
          </span>
          <WindDirection data={data} />. <WindSpeed data={data} />
        </li>
        <li>Visibility: {visibility}km</li>
        <li>Latest weather update: {getFormattedTime(data.dt)}</li>
        <li>Sunrise: {getFormattedTime(data.sys.sunrise)}</li>
        <li>Sunset: {getFormattedTime(data.sys.sunset)}</li>
      </ul>
    </Block>
  )
}

export default WeatherData
