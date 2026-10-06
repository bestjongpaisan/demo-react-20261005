/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mockTrackingApi } from './mock/trackingApi.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mockTrackingApi()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
  },
})
