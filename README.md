# Svelte Markdown

Import Markdown files as Svelte components.

## Installation

Add the extension and support for `.md` files as part of your `svelte.config.js`.

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Import the preprocessor.
import { svelteMarkdown } from 'svelte-markdown';

const config = {
  // Add support `.md` files.
  extensions: ['.svelte', '.md'],

  // Add the preprocessor.
  preprocess: [vitePreprocess(), svelteMarkdown()],

  kit: {
    adapter: adapter(),
  },
};

export default config;
```
