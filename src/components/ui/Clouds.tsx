import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiSleet,
  WiRainMix,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDust,
  WiSmoke,
  WiTornado,
  WiHurricane,
  WiHail,
} from 'react-icons/wi'
import { WeatherDataProps } from '@/interfaces'

interface CloudsProps extends WeatherDataProps {
  iconSize?: number
  description?: boolean
}

const getWeatherIcon = (description: string, icon: string) => {
  const iconMap: { [key: string]: any } = {
    // Group 2xx: Thunderstorm
    'thunderstorm with light rain': WiThunderstorm,
    'thunderstorm with rain': WiThunderstorm,
    'thunderstorm with heavy rain': WiThunderstorm,
    'light thunderstorm': WiThunderstorm,
    thunderstorm: WiThunderstorm,
    'heavy thunderstorm': WiThunderstorm,
    'ragged thunderstorm': WiThunderstorm,
    'thunderstorm with light drizzle': WiThunderstorm,
    'thunderstorm with drizzle': WiThunderstorm,
    'thunderstorm with heavy drizzle': WiThunderstorm,

    // Group 3xx: Drizzle
    'light intensity drizzle': WiSleet,
    drizzle: WiSleet,
    'heavy intensity drizzle': WiSleet,
    'light intensity drizzle rain': WiSleet,
    'drizzle rain': WiSleet,
    'heavy intensity drizzle rain': WiSleet,
    'shower rain and drizzle': WiSleet,
    'heavy shower rain and drizzle': WiSleet,
    'shower drizzle': WiSleet,

    // Group 5xx: Rain
    'light rain': WiSleet,
    'moderate rain': WiRain,
    'heavy intensity rain': WiRain,
    'very heavy rain': WiRain,
    'extreme rain': WiRain,
    'freezing rain': WiSleet,
    'light intensity shower rain': WiShowers,
    'shower rain': WiShowers,
    'heavy intensity shower rain': WiShowers,
    'ragged shower rain': WiShowers,

    // Group 6xx: Snow
    'light snow': WiSnow,
    snow: WiSnow,
    'heavy snow': WiSnow,
    sleet: WiSnow,
    'light shower sleet': WiSnow,
    'shower sleet': WiSnow,
    'light rain and snow': WiRainMix,
    'rain and snow': WiRainMix,
    'light shower snow': WiSnow,
    'shower snow': WiSnow,
    'heavy shower snow': WiSnow,
    hail: WiHail,

    // Group 7xx: Atmosphere
    mist: WiFog,
    smoke: WiFog,
    haze: WiFog,
    'sand/dust whirls': WiFog,
    fog: WiFog,
    sand: WiDust,
    dust: WiDust,
    'volcanic ash': WiSmoke,
    squalls: WiHurricane,
    tornado: WiTornado,

    // Group 800: Clear
    'clear sky': icon.includes('d') ? WiDaySunny : WiNightClear,

    // Group 80x: Clouds
    'few clouds': icon.includes('d') ? WiDayCloudy : WiNightAltCloudy,
    'scattered clouds': WiCloud,
    'broken clouds': WiCloudy,
    'overcast clouds': WiCloudy,
  }

  return iconMap[description] || WiCloud
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
