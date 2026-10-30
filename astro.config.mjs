// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hastExternalLinks } from './src/hast/hast-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://finnalyze.org',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: satteri({
      hastPlugins: [hastExternalLinks],
    }),
  },
});
