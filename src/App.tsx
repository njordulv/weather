import { m, LazyMotion, domAnimation } from 'framer-motion'
import { SearchForm } from '@/components/SearchForm'
import { WeatherData } from '@/components/WeatherData'
import { Forecast } from '@/components/Forecast'
import { Metric } from '@/components/ui/Metric'

export const App = () => {
  return (
    <main className="container mx-auto max-w-[1170px] flex flex-col items-center justify-center gap-10 py-5 min-h-screen">
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
            <SearchForm />
            <Metric />
            <WeatherData />
            <Forecast />
          </m.div>
        </LazyMotion>
      </section>
    </main>
  )
}
