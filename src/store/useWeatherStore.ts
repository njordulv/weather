import { create } from 'zustand'

interface WeatherState {
  defaultCity: string
  setDefaultCity: (city: string) => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  defaultCity: 'Kiev',
  setDefaultCity: (city: string) => set({ defaultCity: city }),
}))
