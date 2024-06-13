import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  TooltipProps,
} from 'recharts'
import { useWeather } from '../hooks/useWeather'
import { formatDateTime } from '../utils'

const API_KEY = process.env.REACT_APP_API_KEY

interface Props {
  defaultCity: string
  isMetric?: boolean
}

interface CustomTooltipProps extends TooltipProps<string, string> {
  active?: boolean
  payload?: any[]
}

export const Forecast = ({ defaultCity, isMetric }: Props) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  const dataPoints = data
    ? data.list.map((item: any) => ({
        name: formatDateTime(item.dt_txt),
        temperature: item.main.temp.toFixed(2),
        wind: item.wind.speed.toFixed(1),
      }))
    : []

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chartTooltip">
          <div>
            <b>{`${label}`}</b>
          </div>
          <div>
            Temp: <b>{`${payload[0].value} ${isMetric ? '°C' : '°F'}`}</b>
          </div>
          <div>
            Wind: <b>{`${payload[1].value} m/s`}</b>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p>{errorMessage}</p>}
      <AreaChart
        width={500}
        height={300}
        data={dataPoints}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="line1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#A0C4F2" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#A0C4F2" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="line2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="50%" stopColor="#6795BD" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#6795BD" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" className="chartX" />
        <YAxis />
        <Tooltip cursor={{ stroke: '#8C3C2A' }} content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="temperature"
          stackId="1"
          stroke="#A0C4F2"
          fillOpacity={1}
          fill="url(#line1)"
          animationBegin={300}
          animationEasing="ease-in-out"
        />
        <Area
          type="monotone"
          dataKey="wind"
          stackId="2"
          stroke="#6795BD"
          fillOpacity={1}
          fill="url(#line2)"
          animationBegin={400}
          animationEasing="ease-in-out"
        />
      </AreaChart>
    </>
  )
}
