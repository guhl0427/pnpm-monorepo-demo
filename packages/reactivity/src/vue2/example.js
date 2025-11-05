import { computed } from "./computed";
import { reactive } from "./reactive";
import { Watcher } from "./watcher";
import { watch } from "./watch";

const data = reactive({
  msg: "hello",
  count: 1
})

const computedCount = computed(() => {
  return data.count * 2
})

function addCount() {
  data.count++
}

const HelloWorld = ({ msg, count }) => {
  return `
    <div>
      <h1>${msg}</h1>
      <h2>count: ${count}</h2>
      <h3>computedCount: ${computedCount.value}</h3>
      <button id="btn">add count</button>
    </div>
  `
}

new Watcher(() => {
  console.log('render')
  const hw = HelloWorld({msg:data.msg, count:data.count})
  document.querySelector('#vue2').innerHTML = hw
  // 添加事件监听器
  const btn = document.querySelector('#btn')
  if (btn) {
    btn.addEventListener('click', addCount)
  }
})

watch(() => computedCount.value, (oldVal, newVal) => {
  console.log('computedCount changed', oldVal, newVal)
})

window.dataVue2 = data
