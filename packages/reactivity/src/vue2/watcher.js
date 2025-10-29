import { Dep } from "./dep.js"

export class Watcher {
  value
  getter

  constructor(getter) {
    this.getter = getter
    this.get()
  }

  get() {
    Dep.target = this
    this.value = this.getter()
    Dep.target = null;
  }

  update() {
    this.get()
  }
}