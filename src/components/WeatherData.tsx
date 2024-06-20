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
      {isError && <Error message={errorMessage} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="flex flex-col">
              {data.name}, {data.sys.country}
              <span className="text-lg">{getDate()}</span>
            </h2>
            <div className="flex text-6xl">
              {tempActual}
              {isMetric ? <WiCelsius /> : <WiFahrenheit />}
            </div>
            <div className="flex flex-col justify-center">
              <Clouds data={data} iconSize={60} description={true} />
            </div>
          </div>
          <ul className="flex gap-10 justify-between">
            <li className="flex flex-col gap-0">
              <span className="flex">
                <WiThermometer size={24} />
                Feels like:
              </span>
              <b>{`${tempFeels}${isMetric ? '°C' : '°F'}`}</b>
            </li>
            <li className="flex flex-col gap-0">
              <span className="flex">
                <WiBarometer size={24} /> Pressure:
              </span>
              <b>{data.main.pressure} hPa</b>
            </li>
            <li className="flex flex-col gap-0">
              <span className="flex">
                <WiHumidity size={24} /> Humidity:
              </span>
              <b>{data.main.humidity} %</b>
            </li>
          </ul>
          <ul className="flex gap-10 justify-between">
            <li className="flex flex-col gap-0">
              <div className="flex">
                <WiStrongWind size={24} />
                Wind Speed:
              </div>
              <div>
                <b className="lowercase">
                  {`${wind}${isMetric ? 'm/s' : 'mph'}`}{' '}
                </b>
              </div>
            </li>
            <li className="flex flex-col gap-0">
              <div className="flex">Wind Direction:</div>
              <WindDirection data={data} />
            </li>
            <li>
              <WindSpeed data={data} />
            </li>
          </ul>
          <ul className="flex gap-10 justify-between">
            <li className="flex flex-col gap-0">
              <span className="flex">
                <WiHorizonAlt size={24} />
                Horizon:
              </span>
              <b>{visibility}km</b>
            </li>
            <li className="flex flex-col gap-0">
              <span className="flex">
                <WiSunrise size={24} /> Sunrise:
              </span>
              <b>{getFormattedTime(data.sys.sunrise)}</b>
            </li>
            <li className="flex flex-col gap-0">
              <span className="flex">
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
