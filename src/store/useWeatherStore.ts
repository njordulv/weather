import { create } from 'zustand'

interface WeatherState {
  defaultCity: string
  searchCity: string
  isMetric: boolean
  data: any | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  updateDefaultCity: (city: string) => void
  updateSearchCity: (city: string) => void
  toggleMetric: () => void
  setData: (data: any) => void
}

export const useWeatherStore = create<WeatherState>((set) => ({
  defaultCity: 'Kyiv',
  searchCity: '',
  isMetric: true,
  data: null,
  isLoading: false,
  isError: false,
  errorMessage: null,
  updateDefaultCity: (city: string) => set({ defaultCity: city }),
  updateSearchCity: (city: string) => set({ searchCity: city }),
  toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),
  setData: (data: any) => set({ data }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (isError: boolean, message?: string) =>
    set({ isError, errorMessage: message || null }),
}))
