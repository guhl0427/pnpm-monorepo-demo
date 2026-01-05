

<script setup lang="ts">
import type { GameItem } from '../data/levels'

defineProps<{
  item: GameItem
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

function getTextSizeClass(text: string) {
  const len = text.length
  const isChinese = /[\u4e00-\u9fa5]/.test(text)
  
  // Single Emoji or 1-2 Latin chars
  if (len <= 2 && !isChinese) return 'text-[4rem] sm:text-[5.5rem] leading-none'
  
  // 1-2 Chinese chars (Category items like 苹果, 汽车, 猫, 狗)
  if (isChinese && len <= 2) return 'text-[2rem] sm:text-[3rem] leading-tight'
  
  // 3-4 Chinese chars or 3-6 Latin chars (仓鼠, 橘子)
  if (len <= 6) return 'text-[1.8rem] sm:text-[2.2rem] leading-tight'
  
  // Medium length phrases (Result of math equations or longer categories)
  if (len <= 10) return 'text-xl sm:text-2xl break-all'
  
  // Long equations or descriptions
  return 'text-base sm:text-lg break-all'
}
</script>

<template>
  <div 
    class="relative flex items-center justify-center aspect-square bg-white p-3 rounded-[20px] cursor-pointer transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.08)] overflow-hidden select-none tap-highlight-transparent active:scale-95 active:shadow-[0_5px_10px_rgba(0,0,0,0.1)] after:absolute after:inset-0 after:rounded-[20px] after:border-4 after:border-transparent after:transition-colors hover:after:border-green-500/30"
    :class="{ 'bg-white': item.type === 'text' }"
    @click="emit('select', item.id)"
    role="button"
    :aria-label="item.label || item.content"
  >
    <div v-if="item.type === 'image'" class="w-[80%] h-[80%] flex items-center justify-center">
      <img :src="item.content" :alt="item.label" class="max-w-full max-h-full object-contain drop-shadow-md" />
    </div>
    <div v-else class="w-full flex items-center justify-center font-bold text-slate-600 text-center break-words leading-[1.2]" :class="getTextSizeClass(item.content)">
      <span>{{ item.content }}</span>
    </div>
  </div>
</template>

