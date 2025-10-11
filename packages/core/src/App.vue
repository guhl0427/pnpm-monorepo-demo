<template>
    <h1>Hello Vue!</h1>
</template>

<script>
import { reactive, toRefs } from "vue"
const state = reactive({
  count: 0,
  name: "World"
})
const { count } = toRefs(state)
console.log(count.value)
</script>