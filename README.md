# Svelte Markdown

Import Markdown files as Svelte components.

## Installation

Add the extension and support for `.md` files as part of your `svelte.config.js`.

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Import the preprocessor.
import { svelteMarkdown } from 'svelte-markdown-component';

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

## Example

Components will be rendered with a `class` prop that can be passed in as well as `metadata` from the YAML frontmatter.

```html
<script context="module">
  export const metadata = { title: 'A Frontmatter Title' };
</script>

<script>
  let className = '';
  export { className as class };
</script>

<div data-markdown class="{className}">
  <h1>Heading</h1>
  <p>Some content</p>
</div>
```
