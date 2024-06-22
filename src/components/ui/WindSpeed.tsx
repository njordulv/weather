import {
  WiDayLightWind,
  WiDayCloudyWindy,
  WiCloudyWindy,
  WiWindy,
  WiStrongWind,
  WiGaleWarning,
  WiHurricaneWarning,
  WiStormWarning,
  WiSandstorm,
  WiNa,
} from 'react-icons/wi'
import { WeatherDataProps } from '@/interfaces'

export const WindSpeed: React.FC<WeatherDataProps> = ({ data }) => {
  if (!data || !data.wind || !data.wind.speed) return null

  let value = data.wind.speed
  let icon
  let description

  switch (true) {
    case value >= 0 && value <= 1.5:
      icon = <WiDayLightWind size={30} />
      description = 'Light air'
      break
    case value > 1.5 && value <= 3.3:
      icon = <WiDayCloudyWindy size={30} />
      description = 'Light breeze'
      break
    case value > 3.4 && value <= 5.4:
      icon = <WiCloudyWindy size={30} />
      description = 'Gentle breeze'
      break
    case value > 5.5 && value <= 7.9:
      icon = <WiWindy size={30} />
      description = 'Moderate breeze'
      break
    case value > 8.0 && value <= 10.7:
      icon = <WiStrongWind size={30} />
      description = 'Fresh breeze'
      break
    case value > 10.8 && value <= 13.8:
      icon = <WiGaleWarning size={30} />
      description = 'Strong breeze'
      break
    case value > 13.9 && value <= 17.1:
      icon = <WiGaleWarning size={30} />
      description = 'Near gale'
      break
    case value > 17.2 && value <= 20.7:
      icon = <WiHurricaneWarning size={30} />
      description = 'Gale'
      break
    case value > 20.8 && value <= 24.4:
      icon = <WiHurricaneWarning size={30} />
      description = 'Strong gale'
      break
    case value > 24.5 && value <= 28.4:
      icon = <WiStormWarning size={30} />
      description = 'Storm'
      break
    case value > 28.5 && value <= 32.6:
      icon = <WiSandstorm size={30} />
      description = 'Hurricane'
      break
    default:
      icon = <WiNa size={30} />
      description = ''
  }

  return (
    <div className="flex flex-col items-center">
      {icon}{' '}
      <span>
        <b>{description}</b>
      </span>
    </div>
  )
}
