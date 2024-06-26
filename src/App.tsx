import { m, LazyMotion, domAnimation } from 'framer-motion'
import Box from '@mui/material/Box'
import { SearchForm } from '@/components/SearchForm'
import { CurrentWeather } from '@/components/CurrentWeather'
import { Forecast } from '@/components/Forecast'
import { GithubLink } from '@/components/GithubLink'

export const App = () => {
  return (
    <Box component="div" className="background">
      <Box
        component="main"
        sx={{
          maxWidth: 1170,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          py: 5,
          minHeight: '100vh',
          paddingTop: '30px',
        }}
      >
        <Box
          component="section"
          sx={{ textTransform: 'capitalize', width: '100%' }}
        >
          <LazyMotion features={domAnimation}>
            <m.div
              initial="initial"
              animate="animate"
              className="m-container"
              transition={{
                staggerChildren: 0.3,
              }}
            >
              <SearchForm />
              <CurrentWeather />
              <Forecast />
              <GithubLink />
            </m.div>
          </LazyMotion>
        </Box>
      </Box>
    </Box>
  )
}
