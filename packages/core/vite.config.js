import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    console.log("command: ", command, "mode: ", mode, "isSsrBuild: ", isSsrBuild, "isPreview: ", isPreview);
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