<script setup lang="ts">
defineProps<{
  isCorrect: boolean
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'next'): void
  (e: 'retry'): void
}>()
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-5 box-border">
    <div 
      class="bg-white/95 p-10 rounded-[30px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] w-full max-w-[400px] animate-in zoom-in duration-300 border border-white/50"
      :class="isCorrect ? 'border-green-100' : 'border-orange-100'"
    >
      <div class="text-[80px] mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        {{ isCorrect ? '🎉' : '🤔' }}
      </div>
      <h2 class="text-4xl font-extrabold mb-8 m-0 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
        {{ isCorrect ? '答对了！真棒！' : '再试一次哦' }}
      </h2>
      <button 
        v-if="isCorrect" 
        @click="emit('next')" 
        class="w-full text-xl py-4 px-12 rounded-full border-none cursor-pointer bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold shadow-lg shadow-green-500/20 active:scale-95 transition-all"
      >
        下一关
      </button>
      <button 
        v-else 
        @click="emit('retry')" 
        class="w-full text-xl py-4 px-12 rounded-full border-none cursor-pointer bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
      >
        再试一次
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind handles the most of it, keeping animation definition if needed or using standard tailwind ones */
.animate-in {
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
