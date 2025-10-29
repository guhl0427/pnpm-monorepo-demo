import { reactive } from "./reactive.js";
import { Watcher } from "./watcher.js";

const data = reactive({
  msg: "hello"
})

new Watcher(() => {
  console.log('data.msg', data.msg)
})

setTimeout(() => {
  data.msg = 'world'
}, 1000)