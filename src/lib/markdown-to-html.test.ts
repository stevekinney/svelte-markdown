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
    "<script module>
      /**
       * The name of the Markdown file.
       * @type {string | undefined}
       */
      export const filename = example.md;

      /**
       * Any frontmatter data from the Markdown file.
       * @type {Record<string, unknown>}
       */
      export const metadata = { title: "A Frontmatter Title" };
    </script>

    <script>
      const {
        /**
         * Classes that you can apply to the markdown container
         * @type {string | undefined}
         * */
        class: className = "",
        /**
         * Any other props you want to pass to the markdown container
         * @type {import('svelte/elements').HTMLAttributes}
         */
        ...props
      } = $props();
    </script>

    <div data-markdown class="{className}" {...props}>
      <h1>Heading</h1>
      <p>Some content</p>
    </svelte:element>
    "
  `);
});
