import { m, LazyMotion, domAnimation } from 'framer-motion'
import { SearchForm } from '@/components/SearchForm'
import { WeatherData } from '@/components/WeatherData'
import { Forecast } from '@/components/Forecast'

export const App = () => {
  return (
    <main className="mx-auto max-w-[1170px] flex flex-col items-center justify-center gap-10 py-5 min-h-screen">
      <section className="App">
        <LazyMotion features={domAnimation}>
          <m.div
            initial="initial"
            animate="animate"
            className="mx-auto flex flex-col sm:grid sm:grid-cols-12 gap-8 px-5"
            transition={{
              staggerChildren: 1,
            }}
          >
            <SearchForm />
            <WeatherData />
            <Forecast />
          </m.div>
        </LazyMotion>
      </section>
    </main>
  )
}
