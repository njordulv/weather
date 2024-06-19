import { useWeatherStore, selectSearchCity } from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'
import { Button } from '@/components/ui/Button'
import { Metric } from '@/components/ui/Metric'

export const SearchForm = () => {
  const searchCity = useWeatherStore(selectSearchCity)
  const updateSearchCity = useWeatherStore((state) => state.updateSearchCity)
  const updateDefaultCity = useWeatherStore((state) => state.updateDefaultCity)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDefaultCity(searchCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchCity(e.target.value)
  }

  return (
    <Block className="col-span-12 row-span-2 flex flex-col justify-center">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[1fr] sm:grid-cols-[3fr_1fr_1fr] gap-6"
      >
        <input
          type="text"
          value={searchCity}
          onChange={handleChange}
          placeholder="Enter city name"
          className="w-full px-7 py-2 rounded-full appearance-none border-none focus:shadow-inner outline-none text-slate-500 shadow-lg transition-all"
        />
        <Button title="Search" type="submit" />
        <Metric />
      </form>
    </Block>
  )
}
export default SearchForm
