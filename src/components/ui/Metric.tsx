import { useWeatherStore } from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'

export const Metric: React.FC = () => {
  const isMetric = useWeatherStore((state) => state.isMetric)
  const toggleMetric = useWeatherStore((state) => state.toggleMetric)

  return (
    <Block className="col-span-12 row-span-2 md:col-span-2 flex flex-col text-default border-0 p-0 text-2xl sm:text-3xl">
      <button onClick={toggleMetric}>{isMetric ? 'Metric' : 'Imperial'}</button>
    </Block>
  )
}
