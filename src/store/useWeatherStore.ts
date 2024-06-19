import { create } from 'zustand'
import { WeatherState } from '@/interfaces'

export const useWeatherStore = create<WeatherState>((set) => ({
  defaultCity: 'Kyiv',
  searchCity: '',
  isMetric: true,
  updateDefaultCity: (city: string) => set({ defaultCity: city }),
  updateSearchCity: (city: string) => set({ searchCity: city }),
  toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),
}))

export const selectDefaultCity = (state: WeatherState) => state.defaultCity
export const selectIsMetric = (state: WeatherState) => state.isMetric
export const selectSearchCity = (state: WeatherState) => state.searchCity
