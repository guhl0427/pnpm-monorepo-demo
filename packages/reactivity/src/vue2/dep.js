export class Dep {
  static target
  deps

  constructor() {
    this.deps = new Set()
  }

  depend() {
    if (Dep.target) {
      this.deps.add(Dep.target)
    }
  }

  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}

/* export function pushTarget(target) {
  Dep.target = target
}

export function popTarget() {
  Dep.target = null
} */

