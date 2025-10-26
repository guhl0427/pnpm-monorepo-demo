import dayjs from 'dayjs'

function format(time, f = 'YYYY-MM-DD') {
  return dayjs(time).format(f)
}

function getTime(time) {
  return dayjs(time).valueOf()
}

// 导出全部函数
export { format, getTime }
