import {
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiBarometer,
  WiHorizonAlt,
  WiHumidity,
  WiStrongWind,
} from 'react-icons/wi'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { getFormattedTime, getDate } from '@/utils'
import { Block } from '@/components/ui/Block'
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

  if (!data) return null

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
      {isLoading && <Loading />}
      {isError && <Error message={errorMessage} />}
      <ul>
        <li>Today {getDate()}</li>
        <li>
          <img
            width="50"
            height="50"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="weather icon"
          />{' '}
          {<WiThermometer size={24} />} {`${temp1}${isMetric ? '°C' : '°F'}`}
        </li>
        <li>
          <WiThermometer size={24} />
          Feels like: {`${temp2}${isMetric ? '°C' : '°F'}`}
        </li>
        <li>{data.weather[0].description}</li>
        <li>Min: {`${tempMin}${isMetric ? '°C' : '°F'}`}</li>
        <li>Max: {`${tempMax}${isMetric ? '°C' : '°F'}`}</li>
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
          <WiHorizonAlt size={24} />: {visibility}km
        </li>
        <li>
          <WiSunrise size={24} /> {getFormattedTime(data.sys.sunrise)}
        </li>
        <li>
          <WiSunset size={24} /> {getFormattedTime(data.sys.sunset)}
        </li>
      </ul>
    </Block>
  )
}

export default WeatherData
