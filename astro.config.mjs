import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
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
