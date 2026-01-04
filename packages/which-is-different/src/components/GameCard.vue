<script setup lang="ts">
import type { GameItem } from '../data/levels'

defineProps<{
  item: GameItem
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div 
    class="game-card" 
    :class="{ 'is-text': item.type === 'text' }"
    @click="emit('select', item.id)"
    role="button"
    :aria-label="item.label || item.content"
  >
    <div v-if="item.type === 'image'" class="image-wrapper">
      <img :src="item.content" :alt="item.label" />
    </div>
    <div v-else class="text-wrapper" :data-length="item.content.length > 2 ? 'long' : item.content.length">
      <span>{{ item.content }}</span>
    </div>
  </div>
</template>

<style scoped>
.game-card {
  border: none;
  border-radius: 20px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.game-card:active {
  transform: scale(0.95);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.game-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 20px;
  border: 4px solid transparent; /* Hidden by default */
  transition: border-color 0.2s;
}

.game-card:hover::after {
  border-color: rgba(76, 175, 80, 0.3);
}

.image-wrapper {
  width: 80%; /* Give it some breathing room */
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.1));
}

.text-wrapper {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  color: #4a5568;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
}

/* Make emojis/short text much bigger */
.game-card:not(:has(.image-wrapper)) .text-wrapper:first-child:where(:not(:empty)) {
    font-size: clamp(4rem, 15vw, 8rem);
}

/* Fallback/simpler approach if :has is risky */
.text-wrapper[data-length="1"],
.text-wrapper[data-length="2"] {
  font-size: clamp(5rem, 25vw, 10rem); /* Significantly bigger */
  line-height: 1; /* Tighten line height for pure emojis */
}

.is-text {
  background: #fff;
}
</style>
