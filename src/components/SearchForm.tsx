interface SearchProps {
  setCity: (value: string) => void
  searchedCity: string
  setSearchedCity: (value: string) => void
}

export const SearchForm = ({
  searchedCity,
  setSearchedCity,
  setCity,
}: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity(searchedCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchedCity}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
export default SearchForm
