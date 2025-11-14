import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    viteSingleFile(),   // 🚀 THIS FIXES EVERYTHING
  ],
})
