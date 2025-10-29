import { Watcher } from "./watcher"

export function watch(getter, watchCallback) {
  new Watcher(getter, { watch: true, watchCallback })
}