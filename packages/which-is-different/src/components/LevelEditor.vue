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
  <div class="level-editor">
    <div class="editor-header">
      <h2>Level Editor</h2>
      <div class="header-actions">
        <button @click="emit('close')">Cancel</button>
        <button class="primary" @click="save">Save Changes</button>
      </div>
    </div>

    <div class="levels-list">
      <div v-for="(level, idx) in levels" :key="level.id" class="level-item">
        <div class="level-header">
          <h3>Level {{ idx + 1 }} (ID: {{ level.id }})</h3>
          <button class="danger" @click="removeLevel(idx)">Delete</button>
        </div>
        
        <div class="form-group">
          <label>Title:</label>
          <input v-model="level.title" />
        </div>
        
        <div class="form-group">
          <label>Description:</label>
          <input v-model="level.description" />
        </div>

        <div class="items-grid">
          <div v-for="(item, itemIdx) in level.items" :key="item.id" class="item-edit">
            <h4>Item {{ itemIdx + 1 }}</h4>
            <div class="form-group">
              <label>Type:</label>
              <select v-model="item.type">
                <option value="text">Text</option>
                <option value="image">Image URL</option>
              </select>
            </div>
            <div class="form-group">
              <label>Content:</label>
              <input v-model="item.content" :placeholder="item.type === 'image' ? 'Image URL' : 'Text'" />
            </div>
             <div class="form-group checkbox">
              <label>
                <input type="checkbox" v-model="item.isDifferent" />
                Is Different?
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="add-btn" @click="addLevel">+ Add New Level</button>
  </div>
</template>

<style scoped>
.level-editor {
  padding: 20px;
  background: white;
  min-height: 100vh;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.level-item {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background: #fafafa;
}

.level-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

.item-edit {
  border: 1px solid #eee;
  padding: 10px;
  background: white;
  border-radius: 4px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  width: auto;
  margin-right: 8px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: white;
}

button.primary {
  background: #4CAF50;
  color: white;
  border: none;
}

button.danger {
  background: #ff5252;
  color: white;
  border: none;
}

button.add-btn {
  width: 100%;
  padding: 16px;
  border: 2px dashed #ccc;
  background: transparent;
  font-size: 1.2rem;
  margin-bottom: 40px;
}
</style>
