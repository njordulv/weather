import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useWeather } from '@/hooks/useWeather'
import { useWeatherStore } from '@/store/useWeatherStore'
import { SearchForm } from '@/components/SearchForm'
import { WeatherData } from '@/components/WeatherData'
import { Forecast } from '@/components/Forecast'
import { Metric } from '@/components/ui/Metric'
import { Loading } from '@/components/ui/Loading'
import { Error } from '@/components/ui/Error'

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const defaultCity = useWeatherStore((state) => state.defaultCity)
  const isMetric = useWeatherStore((state) => state.isMetric)

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  return (
    <main className="container mx-auto max-w-[1170px] flex flex-col items-center justify-center gap-10 py-5 min-h-screen">
      <section className="App">
        <LazyMotion features={domAnimation}>
          {isLoading && <Loading />}
          {isError && <Error message={errorMessage} />}
          {!isLoading && !isError && (
            <m.div
              initial="initial"
              animate="animate"
              transition={{
                staggerChildren: 0.1,
              }}
              className="mx-auto flex flex-col sm:grid sm:grid-cols-12 gap-7 sm:px-5"
            >
              <SearchForm />
              <Metric />
              <WeatherData data={data} />
              <Forecast />
            </m.div>
          )}
        </LazyMotion>
      </section>
    </main>
  )
}
