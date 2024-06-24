import { Box } from '@mui/material'

interface ErrorProps {
  message: string
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Box
      sx={{
        gridColumn: { xs: 'span 12', sm: 'span 12' },
        gridRow: 'span 2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {message}
    </Box>
  )
}
