import React from 'react'
import { WiWindDeg } from 'react-icons/wi'
import { WeatherDataProps } from '@/interfaces'

const getFullWindDirection = (deg: number) => {
  switch (true) {
    case deg >= 0 && deg < 22:
      return 'North'
    case deg >= 22 && deg < 45:
      return 'North-Northeast'
    case deg >= 45 && deg < 67:
      return 'Northeast'
    case deg >= 67 && deg < 90:
      return 'East-Northeast'
    case deg >= 90 && deg < 112:
      return 'East'
    case deg >= 112 && deg < 135:
      return 'East-Southeast'
    case deg >= 135 && deg < 157:
      return 'Southeast'
    case deg >= 157 && deg < 180:
      return 'South-Southeast'
    case deg >= 180 && deg < 202:
      return 'South'
    case deg >= 202 && deg < 225:
      return 'South-Southwest'
    case deg >= 225 && deg < 247:
      return 'Southwest'
    case deg >= 247 && deg < 270:
      return 'West-Southwest'
    case deg >= 270 && deg < 292:
      return 'West'
    case deg >= 292 && deg < 315:
      return 'West-Northwest'
    case deg >= 315 && deg < 337:
      return 'Northwest'
    case deg >= 337 && deg <= 360:
      return 'North-Northwest'
    default:
      return 'Direction Unknown'
  }
}

export const WindDirection: React.FC<WeatherDataProps> = ({ data }) => {
  if (!data || !data.wind || typeof data.wind.deg !== 'number') return null

  const value = data.wind.deg
  const rotation = value + 180
  const direction = getFullWindDirection(value)

  return (
    <div className="flex">
      <WiWindDeg size={24} style={{ transform: `rotate(${rotation}deg)` }} />
      <b>{direction}</b>
    </div>
  )
}
