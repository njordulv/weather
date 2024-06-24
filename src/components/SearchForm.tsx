import { Box } from '@mui/material'
import { useWeatherStore, selectSearchCity } from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'
import StyledInput from '@/components/ui/Input'
import { Btn } from '@/components/ui/Btn'
import Metric from '@/components/ui/Metric'

export const SearchForm = () => {
  const searchCity = useWeatherStore(selectSearchCity)
  const updateSearchCity = useWeatherStore((state) => state.updateSearchCity)
  const updateDefaultCity = useWeatherStore((state) => state.updateDefaultCity)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDefaultCity(searchCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchCity(e.target.value)
  }

  return (
    <Block className="col-span-12 justify-center">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '7fr 2fr 2fr',
          },
          gap: {
            xs: 2,
            sm: 3,
          },
          alignItems: 'center',
        }}
      >
        <StyledInput
          value={searchCity}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <Btn title="Search" type="submit" />
        <Metric />
      </Box>
    </Block>
  )
}
export default SearchForm
