import { m } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { BlockProps } from '@/interfaces'

export const Block: React.FC<BlockProps> = ({ className, ...rest }) => {
  return (
    <m.div
      variants={{
        initial: {
          scale: 0.5,
          opacity: 0,
        },
        animate: {
          scale: 1,
          opacity: 1,
        },
      }}
      transition={{
        type: 'spring',
        mass: 4,
        stiffness: 500,
        damping: 50,
      }}
      className={twMerge(
        'rounded-xl container shadow-lg flex flex-col',
        className
      )}
      {...rest}
    />
  )
}
