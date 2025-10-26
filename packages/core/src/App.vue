<template>
    <h1>Hello Vue!</h1>
    <input type="text" v-model="state.name" @input="debouncedInputChange">
</template>

<script setup>
import { reactive } from "vue"
import { debounce } from "@packages/utils"

const state = reactive({
  count: 0,
  name: "World"
})

const debouncedInputChange = debounce(function() {
  console.log("inputChange", state.name)
}, 1000)
</script>