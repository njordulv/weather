import { Block } from '@/components/Block'

interface MetricProps {
  isMetric: boolean
  toggleMetric: () => void
}

export const Metric: React.FC<MetricProps> = ({ isMetric, toggleMetric }) => {
  return (
    <Block className="col-span-12 row-span-2 md:col-span-2 flex flex-col text-default border-0 p-0 text-2xl sm:text-3xl">
      <button onClick={toggleMetric}>{isMetric ? 'Metric' : 'Imperial'}</button>
    </Block>
  )
}
