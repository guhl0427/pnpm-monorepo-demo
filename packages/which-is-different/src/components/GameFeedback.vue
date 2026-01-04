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
  <div v-if="visible" class="feedback-overlay">
    <div class="feedback-content" :class="{ correct: isCorrect, incorrect: !isCorrect }">
      <div class="icon">
        {{ isCorrect ? '🎉' : '🤔' }}
      </div>
      <h2>{{ isCorrect ? '答对了！真棒！' : '再试一次哦' }}</h2>
      <button v-if="isCorrect" @click="emit('next')" class="action-btn">
        下一关
      </button>
      <button v-else @click="emit('retry')" class="action-btn">
        再试一次
      </button>
    </div>
  </div>
</template>

<style scoped>
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  box-sizing: border-box;
}

.feedback-content {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.icon {
  font-size: 80px;
  margin-bottom: 24px;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
}

h2 {
  font-size: 36px; /* Larger */
  margin: 0 0 32px 0;
  color: #2d3748;
  font-weight: 800;
  background: linear-gradient(45deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.action-btn {
  font-size: 20px;
  padding: 16px 48px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  transition: all 0.2s;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  width: 100%;
}

.action-btn:active {
  transform: scale(0.98);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.incorrect .action-btn {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
