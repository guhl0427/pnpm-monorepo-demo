export function isNumber(value) {
  return typeof value === 'number'
}

export function isObject(value) {
  return value !== null && typeof value === 'object'
}

export function isArray(value) {
  return Array.isArray(value)
}
