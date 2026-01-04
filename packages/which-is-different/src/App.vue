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
  <main class="app-container">
    <template v-if="!isEditing">
      <header>
        <div class="header-top">
          <h1>找不同</h1>
          <button @click="isEditing = true" class="icon-btn" aria-label="Settings">⚙️</button>
        </div>
        <p class="subtitle">{{ currentLevel?.description }}</p>
        <p class="level-indicator">Level {{ currentLevelIndex + 1 }} / {{ levels.length }}</p>
      </header>

      <div class="game-area">
        <GameBoard 
          v-if="currentLevel"
          :items="shuffledItems"
          @select="handleSelect"
        />
        <div v-else class="no-levels">
          <p>No levels configured.</p>
          <button @click="resetLevels">Restore Defaults</button>
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
/* Global reset and base styles */
:root {
  font-family: 'Outfit', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}
</style>

<style scoped>
.app-container {
  max-width: 600px; /* Constrain width for mobile-app feel */
  margin: 0 auto;
  padding: 24px 16px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

header {
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.9);
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  backdrop-filter: blur(10px);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
}

.icon-btn {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: rgba(0,0,0,0.05);
}

h1 {
  font-size: 32px; /* Smaller for mobile */
  font-weight: 800;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin: 4px 0 0;
  font-weight: 500;
}

.level-indicator {
  font-size: 14px;
  color: #888;
  margin-top: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.game-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>