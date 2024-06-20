interface ErrorProps {
  message: string
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="rounded-xl text-color border-black col-span-12 row-span-2 flex flex-col justify-center">
      {message}
    </div>
  )
}
