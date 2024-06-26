import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { ButtonProps } from '@/interfaces'

const CustomButton = styled(Button)({
  textTransform: 'none',
  fontSize: 18,
  padding: '6px 12px',
  lineHeight: 1.5,
  color: '#333',
  backgroundColor: '#fff',
  height: 46,
  boxShadow: 'none',
  borderWidth: 1,
  border: '1px solid #DAE2ED',
  borderRadius: 12,
  fontFamily: ['"Baloo 2"'].join(','),
  '&:hover': {
    backgroundColor: 'antiquewhite',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.08),0px 1px 3px 0px rgba(0,0,0,0.08)',
    borderColor: 'antiquewhite',
  },
  '&:focus': {
    backgroundColor: 'antiquewhite',
    borderColor: 'rgba(0,0,0,.2)',
  },
})

export const Btn: React.FC<ButtonProps> = ({ title, onClick, type }) => {
  return (
    <CustomButton type={type} onClick={onClick} variant="contained">
      {title}
    </CustomButton>
  )
}
