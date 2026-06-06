import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  integrations: [react(), keystatic(), markdoc()],
  site: 'https://haikaitech.my',
  outDir: 'dist',
  build: {
    assets: 'assets',
  },
  server: {
    port: 3000,
  },
  vite: {
    resolve: {
      alias: {
        '@': '/',
      },
    },
  },
});
