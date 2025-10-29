import { Watcher } from "./watcher"

export function computed(getter) {
  const obj = {}

  const watcher = new Watcher(getter, { computed: true })
  Object.defineProperty(obj, 'value', {
    get() {
      watcher.depend()
      return watcher.get()
    }
  })
  return obj
}
