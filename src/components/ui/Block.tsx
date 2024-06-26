import { m } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { BlockProps } from '@/interfaces'

export const Block: React.FC<BlockProps> = ({ className, ...rest }) => {
  return (
    <m.div
      transition={{
        type: 'spring',
        mass: 5,
        stiffness: 500,
        damping: 60,
      }}
      className={twMerge(
        'rounded-xl container shadow-lg flex flex-col',
        className
      )}
      {...rest}
    />
  )
}
