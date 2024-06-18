import { create } from 'zustand'
import { WeatherState } from '@/interfaces'

const API_KEY = process.env.REACT_APP_API_KEY

export const useWeatherStore = create<WeatherState>((set, get) => ({
  data: null,
  defaultCity: 'Kyiv',
  searchCity: '',
  isMetric: true,
  isLoading: false,
  isError: false,
  errorMessage: null,
  updateDefaultCity: (city: string) => {
    set({ defaultCity: city })
    get().fetchWeather()
  },
  updateSearchCity: (city: string) => set({ searchCity: city }),
  toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),
  fetchWeather: async () => {
    const { defaultCity, isMetric } = get()
    set({ isLoading: true, isError: false, errorMessage: null })

    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${API_KEY}${
          isMetric ? '&units=metric' : '&units=imperial'
        }`
      )
      const json = await result.json()
      set({ data: json, isLoading: false })
    } catch (err) {
      const error = err as Error
      set({ isError: true, errorMessage: error.message, isLoading: false })
    }
  },
}))

export const selectDefaultCity = (state: WeatherState) => state.defaultCity
export const selectIsMetric = (state: WeatherState) => state.isMetric
export const selectSearchCity = (state: WeatherState) => state.searchCity
export const selectWeatherData = (state: WeatherState) => state.data
export const selectIsLoading = (state: WeatherState) => state.isLoading
export const selectIsError = (state: WeatherState) => state.isError
export const selectErrorMessage = (state: WeatherState) => state.errorMessage
