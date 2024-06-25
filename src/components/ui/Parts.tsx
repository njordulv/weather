import { memo, useMemo } from 'react'
import { getDate } from '@/utils'

export const Today = memo(() => {
  const date = useMemo(() => getDate(), [])
  return <h3>{date}</h3>
})

export const TheCity = memo(
  ({ name, country }: { name: string; country: string }) => (
    <>
      <h2 className="flex flex-col">
        {name}, {country}
      </h2>
    </>
  )
)

export const Temperature = memo(({ temp }: { temp: number }) => (
  <>{Math.ceil(temp)}</>
))

export const Wind = memo(({ temp }: { temp: number }) => <>{temp.toFixed(1)}</>)
