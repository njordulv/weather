import {
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiBarometer,
  WiHorizonAlt,
  WiHumidity,
  WiStrongWind,
  WiCelsius,
  WiFahrenheit,
} from 'react-icons/wi'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { getFormattedTime, getDate } from '@/utils'
import { Block } from '@/components/ui/Block'
import { Clouds } from '@/components/ui/Clouds'
import { WindSpeed } from '@/components/ui/WindSpeed'
import { WindDirection } from '@/components/ui/WindDirection'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'

const API_KEY = process.env.REACT_APP_API_KEY

export const WeatherData = () => {
  const defaultCity = useWeatherStore(selectDefaultCity)
  const isMetric = useWeatherStore(selectIsMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  if (!data) return <Error message={errorMessage} />

  const tempActual = Math.ceil(data.main.temp)
  const tempFeels = Math.ceil(data.main.feels_like)
  const wind = data.wind.speed.toFixed(1)
  const visibility = (data.visibility / 1000).toFixed(1)

  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 bg-white shadow-lg p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="flex flex-col">
          {data.name}, {data.sys.country}
          <span className="text-lg">{getDate()}</span>
        </h2>
        <div className="flex text-6xl">
          {tempActual}
          {isMetric ? <WiCelsius /> : <WiFahrenheit />}
        </div>
        <div>
          <Clouds data={data} size={60} description={false} />
        </div>
      </div>
      {isLoading && <Loading />}
      {isError && <Error message={errorMessage} />}
      <ul>
        <li>
          <WiThermometer size={24} />
          Feels like: {`${tempFeels}${isMetric ? '°C' : '°F'}`}
        </li>
        <li></li>
        <li>
          <WiBarometer size={24} />
          Pressure: {data.main.pressure} hPa
        </li>
        <li>
          <WiHumidity size={24} /> Humidity: {data.main.humidity} %
        </li>
        <li>
          <WiStrongWind size={24} />
          Wind:{' '}
          <span className="lowercase">
            {`${wind}${isMetric ? 'm/s' : 'mph'}`}{' '}
          </span>
          <WindDirection data={data} />. <WindSpeed data={data} />
        </li>
        <li>
          <WiHorizonAlt size={24} /> Horizon: {visibility}km
        </li>
        <li>
          <WiSunrise size={24} /> Sunrise: {getFormattedTime(data.sys.sunrise)}
        </li>
        <li>
          <WiSunset size={24} /> Sunset: {getFormattedTime(data.sys.sunset)}
        </li>
      </ul>
    </Block>
  )
}

export default WeatherData
