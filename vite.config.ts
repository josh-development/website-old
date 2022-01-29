import mdx from '@mdx-js/rollup';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx'
      }),
      enforce: 'pre'
    },
    solid({ extensions: ['.md', '.mdx'] })
  ],
  build: {
    target: 'ESNext'
  }
});
