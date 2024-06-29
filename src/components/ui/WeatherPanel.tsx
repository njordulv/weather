import { WiCelsius, WiFahrenheit } from 'react-icons/wi'
import { Today, TheCity, Temperature } from '@/components/ui/Parts'
import { Clouds } from '@/components/ui/Clouds'

interface WeatherPanelProps {
  name: string
  country: string
  temp: number
  weather: any
  isMetric: boolean
}

export const WeatherPanel: React.FC<WeatherPanelProps> = ({
  name,
  country,
  temp,
  weather,
  isMetric,
}) => {
  return (
    <div className="weather-panel">
      <div>
        <TheCity name={name} country={country} />
        <Today />
      </div>
      <div className="flex text-6xl sm:text-7xl">
        <Temperature temp={temp} />
        {isMetric ? <WiCelsius /> : <WiFahrenheit />}
      </div>
      <div className="flex flex-col justify-center items-end">
        <Clouds data={weather[0]} iconSize={60} description={true} />
      </div>
    </div>
  )
}
