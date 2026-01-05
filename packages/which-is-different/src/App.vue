<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameBoard from './components/GameBoard.vue'
import GameFeedback from './components/GameFeedback.vue'
import LevelEditor from './components/LevelEditor.vue'
import { defaultLevels, generateLevels, type Level } from './data/levels'

const STORAGE_KEY = 'which-is-different-levels'

const levels = ref<Level[]>([])
const currentLevelIndex = ref(0)
const feedbackVisible = ref(false)
const isLastAttemptCorrect = ref(false)
const isEditing = ref(false)

// Initialize levels
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      levels.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse levels', e)
      levels.value = generateLevels() // Fallback to fresh generation
    }
  } else {
    levels.value = generateLevels() // Always generate fresh on load
  }
})

const currentLevel = computed(() => levels.value[currentLevelIndex.value])

// Shuffle items for variety
const shuffledItems = computed(() => {
  if (!currentLevel.value) return []
  return [...currentLevel.value.items].sort(() => Math.random() - 0.5)
})

function handleSelect(id: string) {
  if (!currentLevel.value) return
  const item = currentLevel.value.items.find(i => i.id === id)
  if (item) {
    isLastAttemptCorrect.value = item.isDifferent
    feedbackVisible.value = true
  }
}

function handleNext() {
  feedbackVisible.value = false
  if (currentLevelIndex.value < levels.value.length - 1) {
    currentLevelIndex.value++
  } else {
    alert('恭喜你通关了！') 
    currentLevelIndex.value = 0
  }
}

function handleRetry() {
  feedbackVisible.value = false
}

function saveLevels(newLevels: Level[]) {
  levels.value = newLevels
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newLevels))
  isEditing.value = false
  currentLevelIndex.value = 0 // Reset game on update
}

function resetLevels() {
  if (confirm('Restore default levels? This will lose custom changes.')) { 
    levels.value = defaultLevels
    localStorage.removeItem(STORAGE_KEY)
  }
}
</script>

<template>
  <main class="max-w-[600px] mx-auto p-6 min-h-screen flex flex-col text-center box-border font-sans text-slate-700 bg-gradient-to-br from-[#f6d365] to-[#fda085]">
    <template v-if="!isEditing">
      <header class="mb-6 bg-white/90 p-4 rounded-[20px] shadow-sm backdrop-blur-md">
        <div class="flex items-center justify-center relative mb-2">
          <h1 class="text-[2rem] font-extrabold bg-gradient-to-tr from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent m-0 tracking-tighter">找不同</h1>
          <button @click="isEditing = true" class="absolute right-0 bg-transparent border-none text-2xl cursor-pointer p-2 rounded-full hover:bg-black/5 transition-colors" aria-label="Settings">⚙️</button>
        </div>
        <!-- <p class="subtitle">{{ currentLevel?.description }}</p> -->
        <p class="text-sm text-slate-400 mt-3 font-semibold uppercase tracking-widest">Level {{ currentLevelIndex + 1 }} / {{ levels.length }}</p>
      </header>

      <div class="flex-1 flex items-center justify-center">
        <GameBoard 
          v-if="currentLevel"
          :items="shuffledItems"
          @select="handleSelect"
        />
        <div v-else class="text-slate-500">
          <p class="mb-4">No levels configured.</p>
          <button @click="resetLevels" class="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-[#FF6B6B]">Restore Defaults</button>
        </div>
      </div>

      <GameFeedback 
        :visible="feedbackVisible"
        :isCorrect="isLastAttemptCorrect"
        @next="handleNext"
        @retry="handleRetry"
      />
    </template>

    <LevelEditor 
      v-else 
      :initialLevels="levels"
      @save="saveLevels"
      @close="isEditing = false"
    />
  </main>
</template>

<style>
/* Global reset is handled by Tailwind preflight usually, keeping minimal checks */
</style>