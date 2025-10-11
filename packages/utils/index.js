import dayjs from 'dayjs'
export function format(time, f = 'YYYY-MM-DD') {
  return dayjs(time).format(f)
}

export function getTime(time) {
  return dayjs(time).valueOf()
}