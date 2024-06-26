import { forwardRef } from 'react'
import { Input as BaseInput } from '@mui/base/Input'
import { styled } from '@mui/material/styles'

const InputElement = styled('input')(() => ({
  width: '100%',
  fontFamily: 'inherit',
  fontWeight: 400,
  padding: '10px 14px',
  borderRadius: 12,
  color: grey[900],
  backgroundColor: 'white',
  border: `1px solid ${grey[200]}`,

  '&:hover': {
    borderColor: grey[400],
  },
  '&:focus': {
    borderColor: grey[400],
    boxShadow: `0 0 0 3px grey[200]}`,
  },
  '&:focus-visible': {
    outline: 0,
  },
}))

const Input = forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />
})

export default function StyledInput(props: any) {
  return <Input {...props} />
}

const grey = {
  200: '#DAE2ED',
  400: '#B0B8C4',
  900: '#1C2025',
}
