import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://haikaitech.my',
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), keystatic(), markdoc()],
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
