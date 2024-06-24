import { useWeatherStore, selectSearchCity } from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'
import StyledInput from '@/components/ui/Input'
import { Btn } from '@/components/ui/Btn'
import Metric from '@/components/ui/Metric'

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
        className="grid grid-cols-[1fr] sm:grid-cols-[7fr_2fr_2fr] items-center sm:gap-6 gap-4"
      >
        <StyledInput
          value={searchCity}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <Btn title="Search" type="submit" />
        <Metric />
      </form>
    </Block>
  )
}
export default SearchForm
