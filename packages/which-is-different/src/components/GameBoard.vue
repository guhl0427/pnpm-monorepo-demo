<script setup lang="ts">
import GameCard from './GameCard.vue'
import type { GameItem } from '../data/levels'

defineProps<{
  items: GameItem[]
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3 w-full max-w-[400px] p-3 mx-auto aspect-square">
    <GameCard 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      @select="$emit('select', $event)"
    />
  </div>
</template>

<style>
/* No styles needed, all Tailwind */
</style>
