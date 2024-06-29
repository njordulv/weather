import { Link } from '@mui/material'
import { SiGithub } from 'react-icons/si'
import { Block } from '@/components/ui/Block'

export const GithubLink = () => {
  return (
    <Block
      className="absolute right-1 bottom-1 w-6 h-6 p-0 rounded-full shadow-none"
      variants={{
        initial: {
          scale: 0,
          opacity: 0,
          y: 40,
        },
        animate: {
          scale: 1,
          opacity: 1,
          y: 0,
        },
      }}
    >
      <Link
        href="https://github.com/njordulv/weather"
        color="#e6c29e"
        sx={{
          transition: 'color 0.3s ease',
          '&:hover': {
            color: '#fcfcfc',
          },
        }}
      >
        <SiGithub size={22} />
      </Link>
    </Block>
  )
}
