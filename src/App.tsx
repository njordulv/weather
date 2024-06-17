import { useState } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useWeather } from '@/hooks/useWeather'
import { useWeatherStore } from '@/store/useWeatherStore'
import { SearchForm } from '@/components/SearchForm'
import { WeatherData } from '@/components/WeatherData'
import { Forecast } from '@/components/Forecast'
import { Metric } from '@/components/Metric'

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const defaultCity = useWeatherStore((state) => state.defaultCity)
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
    <main className="container mx-auto max-w-[1170px] flex flex-col items-center justify-center gap-10 py-5 md:pt-10 sm:pb-24 pb-10">
      <section className="App">
        <LazyMotion features={domAnimation}>
          <m.div
            initial="initial"
            animate="animate"
            transition={{
              staggerChildren: 0.1,
            }}
            className="mx-auto flex flex-col sm:grid sm:grid-cols-12 gap-7 sm:px-5"
          >
            {isLoading && <p>Loading</p>}
            {isError && <p>{errorMessage}</p>}
            <SearchForm searchCity={searchCity} setSearchCity={setSearchCity} />
            <Metric isMetric={isMetric} toggleMetric={toggleMetric} />
            <WeatherData data={data} isMetric={isMetric} />
            <Forecast defaultCity={defaultCity} isMetric={isMetric} />
          </m.div>
        </LazyMotion>
      </section>
    </main>
  )
}
