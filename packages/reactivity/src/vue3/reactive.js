import { activeEffect } from './effect.js'
export const bucket = new WeakMap()// target -> key -> deps

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
      return true
    }
  })
}

function track(target, key) {
  if (!activeEffect) return

  // key -> deps
  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  const effectsToRun = new Set(deps)
  // deps && deps.forEach(effect => effectsToRun.add(effect))
  effectsToRun.forEach(effect => effect())
}