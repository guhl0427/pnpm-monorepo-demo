<script setup>
import { reactive } from "vue"
import { debounce } from "@packages/utils"

const state = reactive({
  count: 0,
  name: "Hello Vue!"
})

const debouncedInputChange = debounce(function(event) {
  state.name = event.target.value
  console.log("inputChange", state.name)
}, 1000)
</script>

<template>
  <div>
    <h1>{{ state.name }}</h1>
    <input type="text" :value="state.name" @input="debouncedInputChange">
  </div>
</template>
