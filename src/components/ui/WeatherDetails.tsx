import {
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiSmallCraftAdvisory,
  WiCloud,
} from 'react-icons/wi'
import { getFormattedTime } from '@/utils'
import { Temperature, Wind } from '@/components/ui/Parts'
import { WindSpeed } from '@/components/ui/WindSpeed'
import { WindDirection } from '@/components/ui/WindDirection'

interface WeatherDetailsProps {
  feels_like: number
  pressure: number
  humidity: number
  windSpeed: number
  windDirection: any
  cloudiness: number
  sunrise: number
  sunset: number
  isMetric: boolean
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  feels_like,
  pressure,
  humidity,
  windSpeed,
  windDirection,
  cloudiness,
  sunrise,
  sunset,
  isMetric,
}) => {
  return (
    <ul className="weather-list">
      <li>
        <span>
          <WiThermometer size={24} />
          Feels like:
        </span>
        <b>
          <Temperature temp={feels_like} />
          {isMetric ? '°C' : '°F'}
        </b>
      </li>
      <li>
        <span>
          <WiBarometer size={24} /> Pressure:
        </span>
        <b>{pressure} hPa</b>
      </li>
      <li>
        <span>
          <WiHumidity size={24} /> Humidity:
        </span>
        <b>{humidity} %</b>
      </li>
      <li>
        <span>
          <WiStrongWind size={24} />
          Wind Speed:
        </span>
        <span>
          <Wind temp={windSpeed} />
          <em>{isMetric ? 'm/s' : 'mph'}</em>
        </span>
      </li>
      <li>
        <span>
          <WiSmallCraftAdvisory size={24} /> Direction:
        </span>
        <span>
          <WindDirection data={windDirection} />
        </span>
      </li>
      <li>
        <WindSpeed data={windDirection} />
      </li>
      <li>
        <span>
          <WiCloud size={24} />
          Clouds:
        </span>
        <b>{cloudiness} %</b>
      </li>
      <li>
        <span>
          <WiSunrise size={24} /> Sunrise:
        </span>
        <b>{getFormattedTime(sunrise)}</b>
      </li>
      <li>
        <span>
          <WiSunset size={24} /> Sunset:
        </span>
        <b>{getFormattedTime(sunset)}</b>
      </li>
    </ul>
  )
}
