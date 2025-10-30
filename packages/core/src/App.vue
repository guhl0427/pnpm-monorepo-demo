<template>
  <HelloWorld />
</template>

<script setup>
import HelloWorld from '@/component/HelloWorld.vue';
import { reactive, watch } from 'vue'
let data = reactive({
  count: 0
})

watch(() => data, (newVal)=> {
  console.log('function');
  console.log("new val", newVal.count)
}, { deep: true })

watch(data, (newVal)=> {
  console.log('reactive obj');
  console.log("new val", newVal.count)
})

setTimeout(() => {
  data.count++
  data = reactive({
    count: 2
  })
}, 1000)
</script>