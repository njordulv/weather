import { useWeatherStore } from '@/store/useWeatherStore'
import { Block } from '@/components/Block'

export const Metric = () => {
  const isMetric = useWeatherStore((state) => state.isMetric)
  const setIsMetric = useWeatherStore((state) => state.setIsMetric)

  return (
    <Block className="col-span-12 row-span-2 md:col-span-2 flex flex-col text-default border-0 p-0 text-2xl sm:text-3xl">
      <button onClick={setIsMetric}>{isMetric ? 'Metric' : 'Imperial'}</button>
    </Block>
  )
}
