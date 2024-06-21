import React from 'react'
import { WiWindDeg } from 'react-icons/wi'
import { WeatherDataProps } from '@/interfaces'

const getWindDirection = (deg: number) => {
  switch (true) {
    case deg >= 0 && deg < 22:
      return 'N'
    case deg >= 22 && deg < 45:
      return 'NNE'
    case deg >= 45 && deg < 67:
      return 'NE'
    case deg >= 67 && deg < 90:
      return 'ENE'
    case deg >= 90 && deg < 112:
      return 'E'
    case deg >= 112 && deg < 135:
      return 'ESE'
    case deg >= 135 && deg < 157:
      return 'SE'
    case deg >= 157 && deg < 180:
      return 'SSE'
    case deg >= 180 && deg < 202:
      return 'S'
    case deg >= 202 && deg < 225:
      return 'SSW'
    case deg >= 225 && deg < 247:
      return 'SW'
    case deg >= 247 && deg < 270:
      return 'WSW'
    case deg >= 270 && deg < 292:
      return 'W'
    case deg >= 292 && deg < 315:
      return 'WNW'
    case deg >= 315 && deg < 337:
      return 'NW'
    case deg >= 337 && deg <= 360:
      return 'NNW'
    default:
      return 'Unknown'
  }
}

export const WindDirection: React.FC<WeatherDataProps> = ({ data }) => {
  if (!data || !data.wind || typeof data.wind.deg !== 'number') return null

  const value = data.wind.deg
  const rotation = value + 180
  const direction = getWindDirection(value)

  return (
    <>
      <WiWindDeg size={24} style={{ transform: `rotate(${rotation}deg)` }} />
      <b>{direction}</b>
    </>
  )
}
