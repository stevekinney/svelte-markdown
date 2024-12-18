import { parse, type Processed } from 'svelte/compiler';

import matter from 'gray-matter';
import MagicString from 'magic-string';
import prettier from 'prettier';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

const format = (code: string) => prettier.format(code, { parser: 'html' });

const getFronmatter = (content: string) => {
  const result = matter(content.trim());
  return result.data;
};

const getScript = async () => {
  return format(`
    <script>
      const {
        /**
         * The tag name of the markdown container
         * @type {keyof import('svelte/elements').SvelteHTMLElements}
         * */
        as? = 'div',
        /**
         * Classes that you can apply to the markdown container
         * @type {string | undefined}
         * */
        class: className = '',
        /**
         * Any other props you want to pass to the markdown container
         * @type {import('svelte/elements').HTMLAttributes}
         */
        ...props
      } = $props();
    </script>
  `);
};

const toExports = async (data: Record<string, unknown> = {}, filename: string | undefined) => {
  return format(`
    <script module>
      /**
       * The name of the Markdown file.
       * @type {string | undefined}
       */
      export const filename = ${filename};

      /**
       * Any frontmatter data from the Markdown file.
       * @type {Record<string, unknown>}
       */
      export const metadata = ${JSON.stringify(data)};
    </script>
  `);
};

const toHTML = async (content: string) => {
  const markup = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return format(
    `<svelte:element this={as} data-markdown class={className} {...props}>${markup}</svelte:element>`,
  );
};

const prepend = (result: MagicString, content: string) => {
  result.prepend(content + '\n');
};

export const processMarkdown = async ({
  content,
  filename,
}: {
  content: string;
  filename?: string;
}): Promise<Processed> => {
  const result = new MagicString(content);

  const { html } = parse(content);
  const { start, end } = html;

  const metadata = getFronmatter(content);
  const markup = await toHTML(content.slice(start, end));

  result.update(start, end, String(markup));

  prepend(result, await getScript());
  prepend(result, await toExports(metadata, filename));

  const code = result.toString();
  const map = result.generateMap({ source: filename, hires: true });

  return {
    code,
    map,
  };
};
