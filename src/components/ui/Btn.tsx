import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { ButtonProps } from '@/interfaces'

const BootstrapButton = styled(Button)({
  textTransform: 'none',
  fontSize: 18,
  padding: '6px 12px',
  lineHeight: 1.5,
  color: '#333',
  backgroundColor: '#fff',
  height: 46,
  boxShadow: 'shadow-lg',
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius: 12,
  fontFamily: ['"Baloo 2"'].join(','),
  '&:hover': {
    backgroundColor: '#D3EFF7',
    boxShadow: 'shadow-inner',
  },
  '&:active': {
    backgroundColor: '#D3EFF7',
    boxShadow: 'shadow-inner',
    color: '#21baf2',
  },
  '&:focus': {
    backgroundColor: '#D3EFF7',
    boxShadow: 'shadow-inner',
  },
})

export const Btn: React.FC<ButtonProps> = ({ title, onClick, type }) => {
  return (
    <BootstrapButton type={type} onClick={onClick} variant="contained">
      {title}
    </BootstrapButton>
  )
}
