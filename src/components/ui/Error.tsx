import Stack from '@mui/material/Stack'

interface ErrorProps {
  message: string | null
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Stack
      useFlexGap
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {message}
    </Stack>
  )
}
