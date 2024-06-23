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

  return (
    <Block className="col-span-12 row-span-2 lg:col-span-6 bg-white p-4 gap-3">
      {isError && <Error message={errorMessage} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex flex-col">
                {data.name}, {data.sys.country}
              </h2>
              <h3>{getDate()}</h3>
            </div>
            <div className="flex text-6xl">
              {tempActual}
              {isMetric ? <WiCelsius /> : <WiFahrenheit />}
            </div>
            <div className="flex flex-col justify-center items-end">
              <Clouds data={data} iconSize={60} description={true} />
            </div>
          </div>
          <ul className="weather-list">
            <li>
              <span>
                <WiThermometer size={24} />
                Feels like:
              </span>
              <b>
                {tempFeels}
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
                <b>{wind}</b>
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

export default WeatherData
