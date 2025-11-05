let activeEffect = null
export function effect(fn) {

  const effectFn = () => {
    cleanUp(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()
}

function cleanUp(effectFn) {
  if (!effectFn.deps.length) return
  effectFn.deps.forEach(dep => {
    dep.delete(effectFn)
    console.log('clean up ')
  })
  effectFn.deps.length = 0
}

export { activeEffect }