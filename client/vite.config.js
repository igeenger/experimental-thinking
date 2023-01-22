import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: { '/api': 'http://localhost:3000' },
  },
  build: {
    outDir: '../build/public'
  },
  plugins: [
    tsconfigPaths(),
    svelte({
      hot: {
        preserveLocalState: true
      }
    }),
  ]
})
