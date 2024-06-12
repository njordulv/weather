import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import { SearchForm } from './SearchForm'
import { WeatherData } from './WeatherData'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [searchedCity, setSearchedCity] = useState('')
  const [city, setCity] = useState('Kiev')
  const [isMetric, setIsMetric] = useState(true)

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}${
    isMetric ? '&units=metric' : ''
  }`
  const { data, isLoading, isError, errorMessage } = useWeather({ endpoint })

  const toggleMetric = () => {
    setIsMetric(!isMetric)
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <p>Loading</p>}
        {isError && <p>{errorMessage}</p>}
        <button onClick={toggleMetric}>
          {isMetric ? 'Metric' : 'Imperial'}
        </button>
        <SearchForm
          searchedCity={searchedCity}
          setSearchedCity={setSearchedCity}
          setCity={setCity}
        />
        <WeatherData data={data} />
      </header>
    </div>
  )
}

export default App
