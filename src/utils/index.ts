export const getFormattedTime = (timestamp: number) => {
  const dateObj = new Date(timestamp * 1000)
  const hours = dateObj.getHours() % 12 || 12
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const amPm = dateObj.getHours() >= 12 ? 'PM' : 'AM'

  return `${hours}:${minutes} ${amPm}`
}

export function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime)

  const optionsWeekday: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  }

  const optionsDay: Intl.DateTimeFormatOptions = {
    day: 'numeric',
  }

  const weekday = date.toLocaleDateString('en-US', optionsWeekday)
  const day = date.toLocaleDateString('en-US', optionsDay)

  return `${weekday}, ${day}`
}

export function getDate() {
  const date = new Date()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const dayOfMonth = date.getDate()

  return `${dayOfWeek}, ${dayOfMonth}`
}
