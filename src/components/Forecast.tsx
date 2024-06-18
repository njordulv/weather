import { Block } from '@/components/ui/Block'
import {
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  TooltipProps,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts'
import { useWeather } from '@/hooks/useWeather'
import {
  useWeatherStore,
  selectDefaultCity,
  selectIsMetric,
} from '@/store/useWeatherStore'
import { formatDateTime } from '@/utils'

const API_KEY = process.env.REACT_APP_API_KEY

interface CustomTooltipProps extends TooltipProps<string, string> {
  active?: boolean
  payload?: any[]
}

export const Forecast: React.FC = () => {
  const defaultCity = useWeatherStore(selectDefaultCity)
  const isMetric = useWeatherStore(selectIsMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  const dataPoints = data
    ? data.list.map((item: any) => ({
        name: formatDateTime(item.dt_txt),
        temperature: Math.ceil(item.main.temp),
        humidity: item.main.humidity,
        wind: item.wind.speed.toFixed(1),
        description: item.weather[0].description,
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
          {payload[2] && (
            <div>
              Humidity: <b>{`${payload[0].value} %`}</b>
            </div>
          )}
          <div>
            Temperature:{' '}
            <b>{`${payload[1].value} ${isMetric ? '°C' : '°F'}`}</b>
          </div>
          <div>
            Wind: <b>{`${payload[2].value} m/s`}</b>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <Block className="col-span-12 row-span-2 md:col-span-6 bg-white shadow-lg p-6 flex flex-col gap-5">
      {isLoading && <p>Loading</p>}
      {isError && <p>{errorMessage}</p>}
      <h2>5-day Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={dataPoints}
          margin={{ top: 5, right: 25, bottom: 5, left: -25 }}
        >
          <defs>
            <linearGradient id="line1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#FFB686" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFB686" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="line2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#FF755F" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF755F" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="line3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CDD5C6" stopOpacity={1} />
              <stop offset="90%" stopColor="#CDD5C6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" className="chartX" stroke="#777" />
          <YAxis className="chartX" stroke="#777" />
          <Tooltip cursor={{ stroke: '#444' }} content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#CDD5C6"
            strokeWidth={0}
            fillOpacity={1}
            fill="url(#line3)"
          />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#FFB686"
            strokeWidth={0}
            fillOpacity={1}
            fill="url(#line1)"
          />
          <Area
            type="monotone"
            stroke="#FF755F"
            dataKey="wind"
            strokeWidth={0}
            fillOpacity={1}
            fill="url(#line2)"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Block>
  )
}
