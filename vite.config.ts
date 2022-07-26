import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  root: './src',
  base: '',
  plugins: [react()],
  build: {
    sourcemap: command === 'serve',
  }
}))