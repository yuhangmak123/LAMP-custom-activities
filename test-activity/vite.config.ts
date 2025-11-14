import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: './',        // 🔥 REQUIRED — makes asset paths relative
  build: {
    outDir: 'build', // optional: use "build/" instead of default "dist/"
  },
  plugins: [react()],
})
