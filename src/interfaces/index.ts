import { MotionProps } from 'framer-motion'

export type BlockProps = {
  className?: string
} & MotionProps

export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface WeatherDataProps {
  data: WeatherData | null
}

export interface WeatherState {
  data: any | null
  defaultCity: string
  searchCity: string
  isMetric: boolean
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  updateDefaultCity: (city: string) => void
  updateSearchCity: (city: string) => void
  toggleMetric: () => void
  fetchWeather: () => Promise<void>
}

export interface ButtonProps {
  title: string
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
}
