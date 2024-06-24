import { Box, Stack } from '@mui/material'
import {
  WiThermometer,
  WiCelsius,
  WiFahrenheit,
  WiStrongWind,
  WiHumidity,
} from 'react-icons/wi'
import { Block } from '@/components/ui/Block'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { WeatherDataWithForecast } from '@/interfaces'
import { formatDateTime } from '@/utils'
import { Loading } from '@/components/ui/Loading'
import { Clouds } from '@/components/ui/Clouds'

const API_KEY = process.env.REACT_APP_API_KEY

export const Forecast: React.FC = () => {
  const defaultCity = useWeatherStore(selectDefaultCity)
  const isMetric = useWeatherStore(selectIsMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading } = useWeather({ endpoint })

  if (isLoading) return <Loading />
  if (!data) return null

  const filteredData =
    data?.list?.filter((_: any, index: number) => (index + 1) % 8 === 0) || []

  return (
    <>
      <Block className="col-span-12 row-span-2 lg:col-span-6 p-4 gap-5 min-h-64">
        <h2>5-day Forecast</h2>
        <Box component="ul" className="forecast-list">
          {filteredData.map((item: WeatherDataWithForecast) => (
            <Stack component="li" key={item.dt_txt} flexDirection="row">
              <Stack>
                <b>{formatDateTime(item.dt_txt)}</b>
                <span>
                  <Clouds data={item} iconSize={30} description={true} />
                </span>
              </Stack>
              <Stack useFlexGap alignItems="center" flexDirection="row">
                <WiThermometer size={22} />
                <b className="text-3xl">{Math.ceil(item.main.temp)} </b>
                {isMetric ? (
                  <WiCelsius size={34} />
                ) : (
                  <WiFahrenheit size={34} />
                )}
              </Stack>
              <Stack
                useFlexGap
                alignItems="center"
                gap="5px"
                flexDirection="row"
              >
                <WiStrongWind size={30} />
                <b>{item.wind.speed.toFixed(1)}</b>
                <i>{isMetric ? 'm/s' : 'mph'}</i>
              </Stack>
              <Stack
                useFlexGap
                alignItems="center"
                gap="5px"
                flexDirection="row"
              >
                <WiHumidity size={28} />
                {item.main.humidity} %
              </Stack>
            </Stack>
          ))}
        </Box>
      </Block>
    </>
  )
}
