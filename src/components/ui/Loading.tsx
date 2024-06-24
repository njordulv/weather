import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export const Loading: React.FC = () => {
  return (
    <Stack
      useFlexGap
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress color="inherit" />
    </Stack>
  )
}
