import { alpha, styled } from '@mui/material/styles'
import { blue } from '@mui/material/colors'
import Switch from '@mui/material/Switch'
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
    <div className="flex flex-col text-sm items-end">
      <MetricSwitch {...label} defaultChecked onClick={toggleMetric} />
      <span>{isMetric ? 'Metric: °C, m/s' : 'Imperial: °F, mph'}</span>
    </div>
  )
}
