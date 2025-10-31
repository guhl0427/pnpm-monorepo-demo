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
  console.log('new val function', newVal.count); // output: 2
}, { deep: true })

watch(data, (newVal)=> {
  console.log('new val reactive obj', newVal.count); // output: 1
})

setTimeout(() => {
  data.count++
  data = reactive({
    count: 2
  })
}, 1000)
</script>