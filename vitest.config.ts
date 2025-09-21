import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
    },
    globals: true,
    include: ['tests/unit/**/*.test.{js,ts}'],
  },
});
