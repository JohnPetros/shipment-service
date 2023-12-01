import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: '.',
  esbuild: {
    tsconfigRaw: '{}',
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config']
  },
  plugins: [tsconfigPaths()],
})