import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useWeatherStore, selectSearchCity } from '@/store/useWeatherStore'
import { Block } from '@/components/ui/Block'
import StyledInput from '@/components/ui/Input'
import { Btn } from '@/components/ui/Btn'
import Metric from '@/components/ui/Metric'

export const SearchForm = () => {
  const searchCity = useWeatherStore(selectSearchCity)
  const updateSearchCity = useWeatherStore((state) => state.updateSearchCity)
  const updateDefaultCity = useWeatherStore((state) => state.updateDefaultCity)
  const [error, setError] = useState<null | string>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!searchCity.trim()) {
      setError(`Hey, don't leave me blank!`)
      return
    } else {
      setError('')
    }
    updateDefaultCity(searchCity)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length > 2) {
      setError('')
    }
    updateSearchCity(value)
  }

  return (
    <Block
      className="rounded-xl container col-span-12 justify-center"
      variants={{
        initial: {
          scale: 0.95,
          opacity: 0,
          y: -100,
        },
        animate: {
          scale: 1,
          opacity: 1,
          y: 0,
        },
      }}
    >
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
          position: 'relative',
        }}
      >
        <StyledInput
          value={searchCity}
          onChange={handleChange}
          placeholder="There are even more places to check out!"
        />
        <Btn title="Search" type="submit" />
        <Metric />
        <Typography
          sx={{
            position: 'absolute',
            left: 0,
            bottom: -20,
            display: 'flex',
            fontFamily: 'inherit',
            textTransform: 'none',
          }}
        >
          {error}
        </Typography>
      </Box>
    </Block>
  )
}
