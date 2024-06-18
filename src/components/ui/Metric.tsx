import { useWeatherStore } from '@/store/useWeatherStore'
import { Button } from '@/components/ui/Button'

export const Metric: React.FC = () => {
  const isMetric = useWeatherStore((state) => state.isMetric)
  const toggleMetric = useWeatherStore((state) => state.toggleMetric)

  return (
    <>
      <Button
        title={isMetric ? 'Metric: °C, m/s' : 'Imperial: °F, mph'}
        type="button"
        onClick={toggleMetric}
      />
    </>
  )
}
