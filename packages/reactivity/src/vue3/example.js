import { reactive, bucket } from './reactive.js'
import { effect } from './effect.js'

const data = reactive({
  ok: true,
  count: 0
})
effect(() => {
  console.log("effect run");
  document.querySelector('#vue3').innerHTML = `${data.ok ? data.count : 'not ok'}`
})
console.log(bucket)
setTimeout(() => {
  // data.count++
  data.ok = false
  console.log(bucket)
}, 3000)
