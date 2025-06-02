import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Emular __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'C:/Proyectos/NGINX_frontend/dist'),
    emptyOutDir: true,
  },
})

/*  // vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'C:/Proyectos/NGINX_frontend/dist'),
    emptyOutDir: true,
  },
}) */

/*// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'C:/Proyectos/NGINX_frontend/dist'),
    emptyOutDir: true,
  },
})
*/