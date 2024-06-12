import { WeatherDataProps } from '../interfaces'

export const WeatherData = ({ data, isMetric }: WeatherDataProps) => {
  if (!data) return null

  const temp1 = Math.ceil(data.main.temp)
  const temp2 = Math.ceil(data.main.feels_like)
  const tempMin = Math.ceil(data.main.temp_min)
  const tempMax = Math.ceil(data.main.temp_max)
  const wind = data.wind.speed.toFixed(1)
  const visibility = (data.visibility / 1000).toFixed(1)

  return (
    <>
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
        <li>Feels like: {`${temp2}${isMetric ? '°C' : '°F'}`}</li>
        <li>Min: {`${tempMin}${isMetric ? '°C' : '°F'}`}</li>
        <li>Max: {`${tempMax}${isMetric ? '°C' : '°F'}`}</li>
        <li>Weather: {data.weather[0].main}</li>
        <li>Description: {data.weather[0].description}</li>
        <li>Pressure: {data.main.pressure} hPa</li>
        <li>Humidity: {data.main.humidity} %</li>
        <li>Wind: {wind}m/s WSW</li>
        <li>Visibility: {visibility}km</li>
        <li></li>
      </ul>
    </>
  )
}

export default WeatherData
