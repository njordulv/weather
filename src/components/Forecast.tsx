import {
  WiThermometer,
  WiCelsius,
  WiFahrenheit,
  WiStrongWind,
  WiHumidity,
} from 'react-icons/wi'
import { Block } from '@/components/ui/Block'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { WeatherForecast } from '@/interfaces'
import { formatDateTime } from '@/utils'
import { Loading } from '@/components/ui/Loading'

const API_KEY = process.env.REACT_APP_API_KEY

export const Forecast: React.FC = () => {
  const defaultCity = useWeatherStore(selectDefaultCity)
  const isMetric = useWeatherStore(selectIsMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading } = useWeather({ endpoint })

  const filteredData =
    data?.list?.filter((_: any, index: number) => (index + 1) % 8 === 0) || 0

  return (
    <>
      <Block className="col-span-12 row-span-2 lg:col-span-6 bg-white shadow-lg p-6 flex flex-col gap-5 min-h-64">
        {isLoading ? (
          <Loading />
        ) : (
          data && (
            <>
              <h2>5-day Forecast</h2>
              <ul className="weather-list grid-cols-1 text-left">
                {filteredData.map((item: WeatherForecast) => (
                  <li key={item.dt_txt} className="flex gap-4 justify-between">
                    <div>
                      <b>{formatDateTime(item.dt_txt)}</b>
                      <span className="text-sm">
                        {item.weather[0].description}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <WiThermometer size={24} />
                      <b className="text-3xl">{Math.ceil(item.main.temp)} </b>
                      {isMetric ? (
                        <WiCelsius size={30} />
                      ) : (
                        <WiFahrenheit size={30} />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <WiStrongWind size={30} />
                      <b>{item.wind.speed.toFixed(1)}</b>
                      <i>{isMetric ? 'm/s' : 'mph'}</i>
                    </div>
                    <div className="flex items-center">
                      <WiHumidity size={30} />
                      {item.main.humidity} %
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )
        )}
      </Block>
    </>
  )
}
