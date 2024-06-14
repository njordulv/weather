export const getFormattedTime = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000)
  const hours = dateObj.getHours() % 12 || 12
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const amPm = dateObj.getHours() >= 12 ? 'PM' : 'AM'

  return `${hours}:${minutes} ${amPm}`
}

export function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime)

  const options: Intl.DateTimeFormatOptions = {
    // day: 'numeric',
    // month: 'short',
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  }

  const formattedDate = date.toLocaleString('en-US', options)
  return formattedDate.replace(',', ',')
}
