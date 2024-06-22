import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { WeatherState } from '@/interfaces'

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      defaultCity: 'Kyiv',
      searchCity: '',
      isMetric: true,
      updateDefaultCity: (city: string) => set({ defaultCity: city }),
      updateSearchCity: (city: string) => set({ searchCity: city }),
      toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),
    }),
    {
      name: 'weather-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const selectDefaultCity = (state: WeatherState) => state.defaultCity
export const selectIsMetric = (state: WeatherState) => state.isMetric
export const selectSearchCity = (state: WeatherState) => state.searchCity
