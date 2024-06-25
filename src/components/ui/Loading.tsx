import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export const Loading: React.FC = () => {
  return (
    <Stack
      useFlexGap
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      left={30}
      top={15}
      zIndex={1}
    >
      <CircularProgress color="inherit" size={18} />
    </Stack>
  )
}
