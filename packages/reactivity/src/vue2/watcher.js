import { Dep } from "./dep"

export class Watcher {
  value
  getter

  deps
  computed

  watch
  watchCallback

  constructor(getter, options = {}) {
    this.getter = getter

    this.computed = options.computed || false
    this.watch = options.watch || false
    this.watchCallback = options.watchCallback || null

    if (this.computed) {
      this.deps = new Dep()
    } else {
      this.get()
    }
  }

  get() {
    Dep.target = this
    this.value = this.getter()
    Dep.target = null;
    return this.value
  }

  depend() {
    this.deps.depend()
  }

  update() {
    if (this.computed) {
      this.deps.notify()
    } else if (this.watch) {
      if (this.watchCallback) {
        this.watchCallback(this.value, this.get())
      }
    } else {
      this.get()
    }
  }
}