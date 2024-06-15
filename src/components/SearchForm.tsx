import { SearchProps } from '@/interfaces'

export const SearchForm = ({
  searchCity,
  setSearchCity,
  setDefaultCity,
}: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDefaultCity(searchCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchCity}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
export default SearchForm
