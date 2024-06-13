import { WeatherDataProps } from '../interfaces'

export const WindSpeed = ({ data }: WeatherDataProps) => {
  if (!data || !data.wind || !data.wind.speed) return null

  let value = data.wind.speed
  let description

  switch (true) {
    case value >= 0 && value <= 1.5:
      description = 'Light air'
      break
    case value > 1.5 && value <= 3.3:
      description = 'Light breeze'
      break
    case value > 3.4 && value <= 5.4:
      description = 'Gentle breeze'
      break
    case value > 5.5 && value <= 7.9:
      description = 'Moderate breeze'
      break
    case value > 8.0 && value <= 10.7:
      description = 'Fresh breeze'
      break
    case value > 10.8 && value <= 13.8:
      description = 'Strong breeze'
      break
    case value > 13.9 && value <= 17.1:
      description = 'Near gale'
      break
    case value > 17.2 && value <= 20.7:
      description = 'Gale'
      break
    case value > 20.8 && value <= 24.4:
      description = 'Strong gale'
      break
    case value > 24.5 && value <= 28.4:
      description = 'Storm'
      break
    case value > 28.5 && value <= 32.6:
      description = 'Violent storm'
      break
    default:
      description = 'Hurricane'
  }

  return <>{description}</>
}
