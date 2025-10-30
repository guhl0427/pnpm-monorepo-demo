import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// const __dirname = import.meta.dirname
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log("command: ", command, "mode: ", mode, "isSsrBuild: ", isSsrBuild, "isPreview: ", isPreview);
  console.log("__dirname", __dirname);
  console.log("process.cwd", process.cwd());
  console.log("import.meta.dirname", import.meta.dirname);
  
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@packages': resolve(__dirname, '../')
      }
    }
  }
})