import { TiLocationArrow } from 'react-icons/ti'
import { WeatherDataProps } from '@/interfaces'

export const WindDirection: React.FC<WeatherDataProps> = ({ data }) => {
  if (!data || !data.wind || typeof data.wind.deg !== 'number') return null

  const value = data.wind.deg
  const rotation = value + 135

  let direction

  switch (true) {
    case value >= 0 && value < 22:
      direction = 'N'
      break
    case value >= 22 && value < 45:
      direction = 'NNE'
      break
    case value >= 45 && value < 67:
      direction = 'NE'
      break
    case value >= 67 && value < 90:
      direction = 'ENE'
      break
    case value >= 90 && value < 112:
      direction = 'E'
      break
    case value >= 112 && value < 135:
      direction = 'ESE'
      break
    case value >= 135 && value < 157:
      direction = 'SE'
      break
    case value >= 157 && value < 180:
      direction = 'SSE'
      break
    case value >= 180 && value < 202:
      direction = 'S'
      break
    case value >= 202 && value < 225:
      direction = 'SSW'
      break
    case value >= 225 && value < 247:
      direction = 'SW'
      break
    case value >= 247 && value < 270:
      direction = 'WSW'
      break
    case value >= 270 && value < 292:
      direction = 'W'
      break
    case value >= 292 && value < 315:
      direction = 'WNW'
      break
    case value >= 315 && value < 337:
      direction = 'NW'
      break
    case value >= 337 && value <= 360:
      direction = 'NNW'
      break
    default:
      direction = 'Direction Unknown'
  }

  return (
    <>
      <TiLocationArrow style={{ transform: `rotate(${rotation}deg)` }} />{' '}
      {direction}
    </>
  )
}
