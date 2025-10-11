import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    console.log("command: ", command, "mode: ", mode, "isSsrBuild: ", isSsrBuild, "isPreview: ", isPreview);
    return {
        plugins: [vue()]
    }
})