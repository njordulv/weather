interface ErrorProps {
  message: string
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return <div>{message}</div>
}
