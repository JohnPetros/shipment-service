import { defineConfig } from "tsup";

export default defineConfig({
  entry: ['src', '!src/**/*.test.*', '!src/**/*Mock*'],
  splitting: false,
  sourcemap: true,
  clean: true,
})