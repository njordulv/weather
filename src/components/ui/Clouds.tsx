import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi'
import { WeatherDataProps } from '@/interfaces'

interface CloudsProps extends WeatherDataProps {
  iconSize?: number
  description?: boolean
}

const getWeatherIcon = (description: string, icon: string) => {
  switch (description) {
    case 'clear sky':
      return icon.includes('d') ? WiDaySunny : WiNightClear
    case 'few clouds':
      return icon.includes('d') ? WiDayCloudy : WiNightAltCloudy
    case 'scattered clouds':
      return WiCloud
    case 'broken clouds':
      return WiCloudy
    case 'shower rain':
      return WiShowers
    case 'rain':
      return WiRain
    case 'thunderstorm':
      return WiThunderstorm
    case 'snow':
      return WiSnow
    case 'mist':
      return WiFog
    default:
      return WiCloud
  }
}

export const Clouds: React.FC<CloudsProps> = ({
  data,
  iconSize = 24,
  description = false,
}) => {
  if (!data || !data.weather || !data.weather[0].description) return null

  const weatherDescription = data.weather[0].description
  const WeatherIcon = getWeatherIcon(weatherDescription, data.weather[0].icon)

  return (
    <>
      <WeatherIcon size={iconSize} />{' '}
      <span className="text-sm">{description && weatherDescription}</span>
    </>
  )
}
