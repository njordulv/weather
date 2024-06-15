import { useState } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { BlockProps } from '@/interfaces'
import { useWeather } from '@/hooks/useWeather'
import { SearchForm } from '@/components/SearchForm'
import { WeatherData } from '@/components/WeatherData'
import { Forecast } from '@/components/Forecast'

export const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <m.div
      variants={{
        initial: {
          scale: 1.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: 'spring',
        mass: 4,
        stiffness: 500,
        damping: 50,
      }}
      className={twMerge('rounded-xl text-color border-black', className)}
      {...rest}
    />
  )
}

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [defaultCity, setDefaultCity] = useState('Kiev')
  const [searchCity, setSearchCity] = useState('')
  const [isMetric, setIsMetric] = useState(true)

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  const toggleMetric = () => {
    setIsMetric(!isMetric)
  }

  return (
    <section className="App">
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="animate"
          transition={{
            staggerChildren: 0.05,
          }}
          className="mx-auto flex flex-col sm:grid sm:grid-cols-12 gap-7 sm:px-5"
        >
          {isLoading && <p>Loading</p>}
          {isError && <p>{errorMessage}</p>}
          <button onClick={toggleMetric}>
            {isMetric ? 'Metric' : 'Imperial'}
          </button>
          <SearchForm
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            setDefaultCity={setDefaultCity}
          />
          <WeatherData data={data} isMetric={isMetric} />
          <Forecast defaultCity={defaultCity} isMetric={isMetric} />
        </m.div>
      </LazyMotion>
    </section>
  )
}
