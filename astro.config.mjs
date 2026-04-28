import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://blog.jskyzero.com',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      styleOverrides: {
        borderRadius: '6px',
        borderColor: 'var(--color-border-weak)',
        frames: {
          frameBoxShadowCssValue: 'none',
        },
      },
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => {
        const isDark = theme.type === 'dark';
        return `[data-theme='${isDark ? 'dark' : 'light'}']`;
      },
    }),
    mdx(),
  ],
});
