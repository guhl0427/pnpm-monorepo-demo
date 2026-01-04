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
  <div class="game-board">
    <GameCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @select="emit('select', $event)"
    />
  </div>
</template>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  padding: 0;
}
</style>
