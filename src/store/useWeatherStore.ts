import { create } from 'zustand'

interface WeatherState {
  defaultCity: string
  searchCity: string
  isMetric: boolean
  updateDefaultCity: (city: string) => void
  updateSearchCity: (city: string) => void
  toggleMetric: () => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  defaultCity: 'Kyiv',
  searchCity: '',
  isMetric: true,
  updateDefaultCity: (city: string) => set({ defaultCity: city }),
  updateSearchCity: (city: string) => set({ searchCity: city }),
  toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),
}))
