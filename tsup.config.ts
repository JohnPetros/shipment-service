import { defineConfig } from "tsup";

export default defineConfig({
  entry: ['src', '!src/**/*.test.*', '!src/**/mocks'],
  splitting: false,
  sourcemap: true,
  clean: true,
})