export const WeatherData = ({ data }: any) => {
  if (!data) return null

  return (
    <ul>
      <li>Temperature: {data.main.temp}</li>
      <li>Weather: {data.weather[0].main}</li>
      <li>Description: {data.weather[0].description}</li>
      <li>
        <img
          width="50"
          height="50"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </li>
    </ul>
  )
}

export default WeatherData
