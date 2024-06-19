import React from 'react'
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

export const Clouds: React.FC<WeatherDataProps> = ({ data }) => {
  if (!data || !data.weather || !data.weather[0].description) return null

  let description = data.weather[0].description
  let icon

  switch (description) {
    case 'clear sky':
      icon = data.weather[0].icon.includes('d') ? (
        <WiDaySunny size={24} />
      ) : (
        <WiNightClear size={24} />
      )
      break
    case 'few clouds':
      icon = data.weather[0].icon.includes('d') ? (
        <WiDayCloudy size={24} />
      ) : (
        <WiNightAltCloudy size={24} />
      )
      break
    case 'scattered clouds':
      icon = <WiCloud size={24} />
      break
    case 'broken clouds':
      icon = <WiCloudy size={24} />
      break
    case 'shower rain':
      icon = <WiShowers size={24} />
      break
    case 'rain':
      icon = <WiRain size={24} />
      break
    case 'thunderstorm':
      icon = <WiThunderstorm size={24} />
      break
    case 'snow':
      icon = <WiSnow size={24} />
      break
    case 'mist':
      icon = <WiFog size={24} />
      break
    default:
      icon = <WiCloud size={24} />
  }

  return (
    <>
      {icon} {description}
    </>
  )
}
