import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  server: {
    port: 7002
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '@packages': resolve(import.meta.dirname, '../')
    }
  }
})