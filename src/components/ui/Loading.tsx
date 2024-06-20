import CircularProgress from '@mui/material/CircularProgress'

export const Loading: React.FC = () => {
  return (
    <div className="rounded-xl text-color border-black col-span-12 row-span-2 flex flex-col items-center justify-center h-full">
      <CircularProgress color="inherit" />
    </div>
  )
}
