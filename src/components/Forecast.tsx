import { Block } from '@/components/ui/Block'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { Loading } from '@/components/ui/Loading'

const API_KEY = process.env.REACT_APP_API_KEY

export const Forecast: React.FC = () => {
  const defaultCity = useWeatherStore(selectDefaultCity)
  const isMetric = useWeatherStore(selectIsMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading } = useWeather({ endpoint })

  return (
    <>
      <Block className="col-span-12 row-span-2 md:col-span-6 bg-white shadow-lg p-6 flex flex-col gap-5 min-h-64">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data && (
              <>
                <h2>5-day Forecast</h2>
              </>
            )}
          </>
        )}
      </Block>
    </>
  )
}
