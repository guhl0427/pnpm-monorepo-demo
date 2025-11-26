<template>
  {{ data }}
</template>

<script setup>
import { reactive, watch } from 'vue'
let data = reactive({ count: 0 })

watch(() => data, (newVal)=> {
  console.log('new val function', newVal.count)
}, { deep: true })

watch(data, (newVal)=> {
  console.log('new val reactive obj', newVal.count)
})

setTimeout(() => {
  data.count++
  data = reactive({ count: 2 })
}, 1000)
</script>