import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import { alpha, styled } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import { useWeatherStore, selectIsMetric } from '@/store/useWeatherStore'

const MetricSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'white',
    '&:hover': {
      backgroundColor: alpha(blue[800], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: blue[600],
  },
}))

const label = { inputProps: { 'aria-label': 'Color switch demo' } }

export default function Metric() {
  const isMetric = useWeatherStore(selectIsMetric)
  const toggleMetric = useWeatherStore((state) => state.toggleMetric)

  return (
    <Stack useFlexGap flexDirection="column" alignItems="end">
      <MetricSwitch {...label} defaultChecked onClick={toggleMetric} />
      <Stack component="span" sx={{ fontSize: '14px' }}>
        {isMetric ? 'Metric: °C, m/s' : 'Imperial: °F, mph'}
      </Stack>
    </Stack>
  )
}
