import { isObject } from "@packages/utils";
import { Dep } from "./dep";

export function reactive(data) {
  if (isObject(data)) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key)
    })
  }
  return data
}

function defineReactive(data, key) {
  let val = data[key]
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend()
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        val = newVal
        dep.notify()
      }
    }
  })
  
  if (isObject(val)) {
    reactive(val)
  }
}