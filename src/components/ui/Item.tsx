import { Box, Stack } from '@mui/material'
import { shallow } from 'zustand/shallow'
import {
  WiThermometer,
  WiCelsius,
  WiFahrenheit,
  WiStrongWind,
  WiHumidity,
} from 'react-icons/wi'
import { useWeatherStore, selectIsMetric } from '@/store/useWeatherStore'
import { ForecastData } from '@/interfaces'
import { formatDateTime } from '@/utils'
import { Clouds } from '@/components/ui/Clouds'

export const Item: React.FC<ForecastData> = ({
  dt,
  dt_txt,
  weather,
  main,
  wind,
}) => {
  const isMetric = useWeatherStore(selectIsMetric, shallow)

  return (
    <Stack component="li" key={dt} flexDirection="row">
      <Stack>
        <Box component="b" position="relative" zIndex="2">
          {formatDateTime(dt_txt)}
        </Box>
        <span>
          <Clouds data={weather?.[0] ?? {}} iconSize={30} description={true} />
        </span>
      </Stack>
      <Stack useFlexGap alignItems="center" flexDirection="row">
        <WiThermometer size={22} />
        <b className="text-3xl">{Math.ceil(main?.temp ?? 0)} </b>
        {isMetric ? <WiCelsius size={34} /> : <WiFahrenheit size={34} />}
      </Stack>
      <Stack useFlexGap alignItems="center" gap="5px" flexDirection="row">
        <WiStrongWind size={30} />
        <b>{(wind?.speed ?? 0).toFixed(1)}</b>
        <i>{isMetric ? 'm/s' : 'mph'}</i>
      </Stack>
      <Stack useFlexGap alignItems="center" gap="5px" flexDirection="row">
        <WiHumidity size={28} />
        {main?.humidity ?? 0} %
      </Stack>
    </Stack>
  )
}
