<script setup lang="ts">
import { ref } from 'vue'
import type { Level } from '../data/levels'

const props = defineProps<{
  initialLevels: Level[]
}>()

const emit = defineEmits<{
  (e: 'save', levels: Level[]): void
  (e: 'close'): void
}>()

const levels = ref<Level[]>(JSON.parse(JSON.stringify(props.initialLevels)))

function addLevel() {
  const newId = levels.value.length ? Math.max(...levels.value.map(l => l.id)) + 1 : 1
  levels.value.push({
    id: newId,
    title: `Level ${newId}`,
    description: 'Find the odd one out',
    items: [
      { id: `l${newId}_1`, type: 'text', content: 'Option 1', isDifferent: false },
      { id: `l${newId}_2`, type: 'text', content: 'Option 2', isDifferent: false },
      { id: `l${newId}_3`, type: 'text', content: 'Option 3', isDifferent: false },
      { id: `l${newId}_4`, type: 'text', content: 'Unique', isDifferent: true },
    ]
  })
}

function removeLevel(index: number) {
  if (confirm('Are you sure you want to delete this level?')) {
    levels.value.splice(index, 1)
  }
}

function save() {
  emit('save', levels.value)
}
</script>

<template>
  <div class="p-5 bg-white min-h-screen">
    <div class="flex justify-between items-center mb-5 sticky top-0 bg-white z-10 pb-3 border-b border-slate-100">
      <h2 class="text-2xl font-bold text-slate-800">游戏编辑器</h2>
      <div class="flex gap-2">
        <button 
          @click="emit('close')"
          class="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          取消
        </button>
        <button 
          @click="save"
          class="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-sm shadow-green-200"
        >
          保存更改
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div v-for="(level, idx) in levels" :key="level.id" class="border border-slate-100 p-5 rounded-xl bg-slate-50/50 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-slate-700">第 {{ idx + 1 }} 关 (ID: {{ level.id }})</h3>
          <button 
            @click="removeLevel(idx)"
            class="px-3 py-1 text-sm rounded-md bg-rose-500 text-white hover:bg-rose-600 transition-colors"
          >
            删除
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="block text-sm font-bold text-slate-600">标题:</label>
            <input v-model="level.title" class="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
          </div>
          
          <div class="space-y-1">
            <label class="block text-sm font-bold text-slate-600">描述:</label>
            <input v-model="level.description" class="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div v-for="(item, itemIdx) in level.items" :key="item.id" class="p-4 border border-slate-100 bg-white rounded-lg shadow-sm space-y-3">
              <h4 class="font-bold text-slate-500 text-sm">选项 {{ itemIdx + 1 }}</h4>
              
              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-400">类型:</label>
                <select v-model="item.type" class="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 outline-none">
                  <option value="text">文字 / Emoji</option>
                  <option value="image">图片链接</option>
                </select>
              </div>

              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-400">内容:</label>
                <input v-model="item.content" :placeholder="item.type === 'image' ? '输入图片 URL' : '输入文字或 Emoji'" class="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-green-500" />
              </div>

              <div class="flex items-center gap-2 pt-1">
                <input type="checkbox" v-model="item.isDifferent" class="w-4 h-4 accent-green-500" />
                <label class="text-sm font-medium text-slate-600">设为“不同项”</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button 
      @click="addLevel"
      class="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-green-300 hover:text-green-500 hover:bg-green-50/50 transition-all mb-10 text-lg"
    >
      + 添加新关卡
    </button>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind */
</style>
