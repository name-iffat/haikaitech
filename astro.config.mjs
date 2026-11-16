import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import publicationControls from './scripts/content/integration.mjs';

export default defineConfig({
  integrations: [publicationControls(), react()],
  site: 'https://haikaitech.my',
  i18n: {
    locales: ['en', 'bm'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
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
