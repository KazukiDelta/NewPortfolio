import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Mở mạng nội bộ (LAN) cho điện thoại và máy khác truy cập
    watch: {
      ignored: ['**/*.webp', '**/*.mp4', '**/*.zip', '**/*.JPG', '**/*.jpg']
    }
  }
})
