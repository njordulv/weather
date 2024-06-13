import { useState } from 'react'
import { useWeather } from '../hooks/useWeather'
import { SearchForm } from './SearchForm'
import { WeatherData } from './WeatherData'
import { Forecast } from './Forecast'

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [defaultCity, setDefaultCity] = useState('Kiev')
  const [searchCity, setSearchCity] = useState('')
  const [isMetric, setIsMetric] = useState(true)

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}${
    isMetric ? '&units=metric' : '&units=imperial'
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
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          setDefaultCity={setDefaultCity}
        />
        <WeatherData data={data} isMetric={isMetric} />
        <Forecast defaultCity={defaultCity} isMetric={isMetric} />
      </header>
    </div>
  )
}

export default App
