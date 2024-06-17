import { create } from 'zustand'

interface WeatherState {
  defaultCity: string
  searchCity: string
  isMetric: boolean
  setDefaultCity: (city: string) => void
  setSearchCity: (city: string) => void
  setIsMetric: () => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  defaultCity: 'Kiev',
  searchCity: '',
  isMetric: true,
  setDefaultCity: (city: string) => set({ defaultCity: city }),
  setSearchCity: (city: string) => set({ searchCity: city }),
  setIsMetric: () => set((state) => ({ isMetric: !state.isMetric })),
}))
