import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/APOD/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        planet: resolve(__dirname, 'planet.html')
      }
    }
  }
})