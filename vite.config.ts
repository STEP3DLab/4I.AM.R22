import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
