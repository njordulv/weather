import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import './App.css'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [searchedCity, setSearchedCity] = useState('')
  const [city, setCity] = useState('Kiev')
  const { data, isLoading, isError, errorMessage } = useWeather({
    endpoint: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCity(searchedCity)
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <p>Loading</p>}
        {isError && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchedCity}
            onChange={(e) => setSearchedCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button type="submit">Submit</button>
        </form>
        {data && <p>{data.name}</p>}
        {data && <p>{data.weather[0].description}</p>}
      </header>
    </div>
  )
}

export default App
