/** @format */

export const formatDate = (strDate: string): string => {
  const date = new Date(strDate)

  const time = date.toLocaleTimeString('ar-AR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const dateStr = date
    .toISOString()
    .substring(0, date.toISOString().indexOf('T'))
    .split('-')
    .reverse()
    .join('/')

  return `${dateStr} ${time}`
}
