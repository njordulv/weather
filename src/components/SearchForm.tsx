import { Block } from '@/components/Block'
import { useWeatherStore } from '@/store/useWeatherStore'
import { SearchProps } from '@/interfaces'

export const SearchForm: React.FC<SearchProps> = ({
  searchCity,
  setSearchCity,
}) => {
  const setDefaultCity = useWeatherStore((state) => state.setDefaultCity)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDefaultCity(searchCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }

  return (
    <Block className="col-span-12 row-span-2 md:col-span-10 bg-success border-2 p-6 flex flex-col justify-center text-default text-2xl sm:text-3xl">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchCity}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <button type="submit">Submit</button>
      </form>
    </Block>
  )
}
export default SearchForm
