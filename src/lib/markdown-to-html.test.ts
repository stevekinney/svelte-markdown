import { it, expect } from 'vitest';
import { processMarkdown } from './markdown-to-html.js';

const example = `
---
title: A Frontmatter Title
---

# Heading

Some content
`.trim();

it('processes Markdown', async () => {
  const { code } = await processMarkdown({ content: example, filename: 'example.md' });
  expect(code).toMatchInlineSnapshot(`
    "<script context="module">
      export const metadata = { title: "A Frontmatter Title" };
    </script>
    <script>
      let className = "";
      export { className as class };
    </script>
    <div data-markdown class="{className}">
      <h1>Heading</h1>
      <p>Some content</p>
    </div>
    "
  `);
});
